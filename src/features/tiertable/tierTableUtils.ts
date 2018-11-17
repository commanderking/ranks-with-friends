import { scaleBand } from "d3";
import _ from "lodash";
import {
  FriendRating,
  RatingsPerCategoryType,
  CategoryNameAndScores,
  TierTableDataRow,
  ItemWithUserRating,
  ItemWithUserRatingByRating,
  ItemWithUserRatingByRatingAndUnranked
} from "./TierTableTypes";
import { Activity, RatingWithFriendInfo } from "../../serverTypes/graphql";

import { tiers, overallTiers, Tiers, OverallTiers } from "../../enums/Tiers";

export const getNumericOverallScoreRating = scaleBand()
  .range([0, 1])
  .domain(overallTiers);

export const getOverallRankingFromScore = (
  score: number | null
): OverallTiers | "-" => {
  const step = getNumericOverallScoreRating.step();
  return score ? overallTiers[Math.round(score / step)] : "-";
};

export const createBookScoresHash = (
  activity: Activity
): RatingsPerCategoryType => {
  const namesByItem = activity.items.reduce((accumulator, item) => {
    return {
      ...accumulator,
      [item.itemId]: {
        id: item.itemId,
        name: item.name,
        friendRatings: {}
      }
    };

    return accumulator;
  }, {});
  // TODO: abstract reduce functions to make more readable
  const ratingsByItem = activity.activityRatings.reduce(
    (byItem, activityRating: RatingWithFriendInfo) => {
      const ratingForItem = activityRating.itemRatings.reduce(
        (ratingsByItemForFriend, item) => {
          if (ratingsByItemForFriend[item.itemId]) {
            ratingsByItemForFriend[item.itemId] = {
              ...ratingsByItemForFriend[item.itemId],
              friendRatings: {
                ...ratingsByItemForFriend[item.itemId].friendRatings,
                [activityRating.friendId]: item.rating
              }
            };
          }
          return byItem;
        },
        byItem
      );
      return ratingForItem;
    },
    namesByItem
  );
  return ratingsByItem;
};

export const sumFriendScores = (total: number, friendRating: Tiers): number => {
  const numericScore = friendRating
    ? getNumericOverallScoreRating(friendRating)
    : 0;
  return numericScore ? total + numericScore : total;
};

export const getFriendScoresForBook = (
  result: FriendRating,
  value: FriendRating
): FriendRating => {
  return {
    ...result,
    ...value
  };
};

export const toCategoryScores = (
  ratingsForItem: CategoryNameAndScores
): TierTableDataRow => {
  const totalScore = _.reduce(ratingsForItem.friendRatings, sumFriendScores, 0);
  const numberFriendsWhoRatedItem = _.size(ratingsForItem.friendRatings);
  const numericScore =
    numberFriendsWhoRatedItem > 0
      ? totalScore / _.size(ratingsForItem.friendRatings)
      : 0;
  const overallScore = getOverallRankingFromScore(numericScore);

  return {
    ...ratingsForItem,
    overallScore,
    numericScore
  };
};

export const toTableData = (activity: Activity) => {
  const hashedDataByBook = createBookScoresHash(activity);
  const data: TierTableDataRow[] = _.map(hashedDataByBook, toCategoryScores);
  return _.sortBy(data, "numericScore").reverse();
};

export const hasFriendCompletedActivityRating = (
  activity: Activity,
  friendId: string
): boolean => {
  const friendIds = activity.activityRatings.map(activity => activity.friendId);
  return !friendIds.includes(friendId);
};

export const tierOptions = tiers
  .map((tier: Tiers) => ({
    value: tier,
    label: tier
  }))
  .reverse();

// Merges one user's ranking with the items
const getItemsWithUserRankings = (
  activity: Activity,
  userId: string
): Array<ItemWithUserRating> => {
  activity.items;
  const userRating = activity.activityRatings.find(
    activityRating => activityRating.friendId === userId
  );

  const userRatingHash = userRating
    ? _.keyBy(userRating.itemRatings, "itemId")
    : {};

  const itemsWithUserRatings = activity.items.map(item => {
    return {
      ...item,
      ...userRatingHash[item.itemId]
    };
  });
  return itemsWithUserRatings;
};

export const getItemsWithoutRankings = (
  activity: Activity,
  userId: string
): Array<ItemWithUserRating> => {
  const items = getItemsWithUserRankings(activity, userId);
  return items.filter(item => {
    return !item.rating;
  });
};

export const groupItemsByUserRanking = (
  activity: Activity,
  userId: string
): ItemWithUserRatingByRating => {
  const itemsWithUserRatings = getItemsWithUserRankings(activity, userId);
  const itemsByTier = tiers.reduce((accumulatedTierRankings, tier) => {
    const itemsWithTierRating = itemsWithUserRatings.filter(item => {
      return item.rating === tier;
    });

    return {
      ...accumulatedTierRankings,
      [tier]: itemsWithTierRating
    };
  }, {});

  return {
    ...itemsByTier
  };
};

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const separateItemsWithRankingsAndUnranked = (
  result: ItemWithUserRatingByRatingAndUnranked
) => {
  return {
    itemsByRanking: _.omit(result, ["unranked"]),
    unrankedItems: _.pick(result, ["unranked"]).unranked
  };
};

export const reorderRankings = (
  itemsByRanking: ItemWithUserRatingByRating,
  unrankedItems: Array<ItemWithUserRating>,
  source: any,
  destination: any
) => {
  // Need to combine tiers and unranked into one object for easier updating of
  // moved item if it's moved from ranked area to unranked or vice versa
  const itemsByRankingsAndUnranked = {
    ...itemsByRanking,
    unranked: unrankedItems
  };

  const current = [...itemsByRankingsAndUnranked[source.droppableId]];
  const next = [...itemsByRankingsAndUnranked[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...itemsByRankingsAndUnranked,
      [source.droppableId]: reordered
    };

    return separateItemsWithRankingsAndUnranked(result);
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...itemsByRankingsAndUnranked,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return separateItemsWithRankingsAndUnranked(result);
};

export const flattenRatedItemsIntoArray = (
  ratedItemsByRating: ItemWithUserRatingByRating
): Array<ItemWithUserRating> => {
  const ratedItems = _.reduce(
    ratedItemsByRating,
    (allItems, tier, key) => {
      // Add rating to each item
      const allItemsInEachTier = tier.map(item => {
        return [{ ...item, rating: key }];
      });
      return _.flatten([...allItems, ...allItemsInEachTier]);
    },
    []
  );
  return ratedItems;
};

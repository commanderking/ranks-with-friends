import { scaleBand } from "d3";
import _ from "lodash";
import {
  FriendRating,
  RatingsPerCategoryType,
  CategoryNameAndScores,
  TierTableDataRow,
  ItemWithUserRating,
  ItemWithUserRatingByRating
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

  const itemsWithoutRankings = itemsWithUserRatings.filter(item => {
    return !item.rating;
  });

  return {
    ...itemsByTier,
    Unranked: itemsWithoutRankings
  };
};

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderRankings = (
  itemsByRanking: ItemWithUserRatingByRating,
  source: any,
  destination: any
) => {
  const current = [...itemsByRanking[source.droppableId]];
  const next = [...itemsByRanking[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...itemsByRanking,
      [source.droppableId]: reordered
    };
    return result;
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...itemsByRanking,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return result;
};

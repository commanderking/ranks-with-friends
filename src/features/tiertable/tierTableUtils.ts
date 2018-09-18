import { scaleBand } from "d3";
import _ from "lodash";
import {
  FriendRating,
  RatingsPerCategoryType,
  CategoryNameAndScores,
  TierTableDataRow
} from "./TierTableTypes";
import { Activity, RatingWithFriendInfo } from "../../serverTypes/graphql";

import { tiers, Tiers } from "../../enums/Tiers";

export const getNumericScoreforRating = scaleBand()
  .range([0, 1])
  .domain(tiers);

export const getRankingFromScore = (score: number): Tiers => {
  const step = getNumericScoreforRating.step();
  return tiers[Math.round(score / step)];
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

export const sumFriendScores = (total: number, FriendRating: Tiers): number => {
  const numericScore = getNumericScoreforRating(FriendRating);
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
  const numericScore = totalScore / _.size(ratingsForItem.friendRatings);
  const overallScore = getRankingFromScore(numericScore);

  return {
    name: ratingsForItem.name,
    friendRatings: ratingsForItem.friendRatings,
    overallScore,
    numericScore
  };
};

export const toTableData = (activity: Activity) => {
  const hashedDataByBook = createBookScoresHash(activity);
  const data: TierTableDataRow[] = _.map(hashedDataByBook, toCategoryScores);
  return _.sortBy(data, "numericScore").reverse();
};

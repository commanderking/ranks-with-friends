import { scaleBand } from "d3";
import _ from "lodash";
import {
  FriendRating,
  RatingsPerCategoryType,
  CategoryNameAndScores,
  TierTableDataRow
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
  console.log("step", step);
  console.log("score", score);
  console.log((score ? score : 0) / step);
  console.log(overallTiers[15]);
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
  console.log("score", numericScore);
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

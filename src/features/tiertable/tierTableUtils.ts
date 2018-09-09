import { scaleBand } from "d3";
import _ from "lodash";
import {
  FriendsDataType,
  FriendScore,
  ScoresPerCategoryType,
  CategoryNameAndScores,
  TierTableDataRow
} from "./TierTableTypes";

import { tiers, Tiers } from "../../enums/Tiers";

export const getNumericScoreforRating = scaleBand()
  .range([0, 1])
  .domain(tiers);

export const getRankingFromScore = (score: number): Tiers => {
  const step = getNumericScoreforRating.step();
  return tiers[Math.round(score / step)];
};

export const createBookScoresHash = (
  friendsData: FriendsDataType[]
): ScoresPerCategoryType => {
  const scoresPerBook = {};
  friendsData.map((friendData: FriendsDataType) => {
    friendData.books.map(book => {
      const { name } = book;
      if (scoresPerBook[name]) {
        scoresPerBook[name].scoresByFriend.push({
          [friendData.friend]: book.score
        });
      } else {
        scoresPerBook[name] = {
          name,
          scoresByFriend: [{ [friendData.friend]: book.score }]
        };
      }
    });
  });
  return scoresPerBook;
};

export const sumFriendScores = (
  total: number,
  friendScore: FriendScore
): number => {
  const letterValue: string = _.values(friendScore)[0];
  const numericScore = getNumericScoreforRating(letterValue);
  return numericScore ? total + numericScore : total;
};

export const getFriendScoresForBook = (
  result: FriendScore,
  value: FriendScore
): FriendScore => {
  return {
    ...result,
    ...value
  };
};

export const toCategoryScores = (
  bookData: CategoryNameAndScores
): TierTableDataRow => {
  const totalScore = _.reduce(bookData.scoresByFriend, sumFriendScores, 0);
  const numericScore = totalScore / bookData.scoresByFriend.length;
  const overallScore = getRankingFromScore(
    totalScore / bookData.scoresByFriend.length
  );

  const friendsBookScore = _.reduce(
    bookData.scoresByFriend,
    getFriendScoresForBook,
    {}
  );

  return {
    name: bookData.name,
    ...friendsBookScore,
    overallScore,
    numericScore
  };
};

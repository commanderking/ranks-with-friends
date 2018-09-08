import { scaleBand } from "d3";
import _ from "lodash";

const rankings = [
  "D-",
  "D",
  "D+",
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S"
];

export const getNumericScoreforRating = scaleBand()
  .range([0, 1])
  .domain(rankings);

export const createBookScoresHash = friendsData => {
  const scoresPerBook = {};
  friendsData.map(friendData => {
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

export const sumFriendScores = (total, friendScore) => {
  const letterValue = Object.values(friendScore)[0];
  return total + getNumericScoreforRating(letterValue);
};

export const getFriendScoresForBook = (result, value) => {
  return {
    ...result,
    ...value
  };
};

export const toCategoryScores = bookData => {
  const totalScore = _.reduce(bookData.scoresByFriend, sumFriendScores, 0);

  const friendsBookScore = _.reduce(
    bookData.scoresByFriend,
    getFriendScoresForBook,
    {}
  );

  return {
    name: bookData.name,
    ...friendsBookScore,
    // TODO: Probably need to filter out null scores when dividing by length of friends
    numericScore: totalScore / bookData.scoresByFriend.length
  };
};

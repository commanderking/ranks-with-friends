import { Tiers } from "../../enums/Tiers";

export interface CategoryScoreType {
  name: string;
  score: Tiers;
}

export interface FriendsDataType {
  friend: string;
  ratings: Array<CategoryScoreType>;
}

export interface FriendRating {
  [friendName: string]: Tiers;
}

export interface CategoryNameAndScores {
  id: string;
  name: string;
  friendRatings: FriendRating;
}

export interface RatingsPerCategoryType {
  [categoryName: string]: CategoryNameAndScores;
}

export interface TierTableDataRow {
  name: string;
  overallScore: string;
  numericScore: number;
  friendRatings: FriendRating;
}

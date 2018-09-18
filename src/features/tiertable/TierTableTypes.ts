import { Tiers } from "../../enums/Tiers";

export interface CategoryScoreType {
  name: string;
  score: Tiers;
}

export interface FriendsDataType {
  friend: string;
  ratings: Array<CategoryScoreType>;
}

export interface FriendScore {
  [friendName: string]: Tiers;
}

export interface CategoryNameAndScores {
  name: string;
  scoresByFriend: Array<FriendScore>;
}

export interface ScoresPerCategoryType {
  [categoryName: string]: CategoryNameAndScores;
}

export interface TierTableDataRow {
  name: string;
  overallScore: string;
  numericScore: number;
  // TODO: Should also include FriendScore
  // [friendName: string]: string
}

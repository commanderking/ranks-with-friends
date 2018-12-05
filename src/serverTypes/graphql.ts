// ====================================================
// Types
// ====================================================

export interface Query {
  getTiersActivity?: (FriendCategory | null)[] | null;

  friend?: Friend | null;

  activity?: Activity | null;

  getUserInfo?: UserInfo | null;
}

export interface FriendCategory {
  friend?: string | null;

  title?: string | null;

  ratings?: (FriendScore | null)[] | null;
}

export interface FriendScore {
  name?: string | null;

  score?: string | null;
}

export interface Friend {
  id: string;

  username: string;

  firstName?: string | null;

  lastName?: string | null;

  image?: string | null;

  myActivities?: (string | null)[] | null;

  friendActivities?: (string | null)[] | null;

  pendingActivities?: (string | null)[] | null;
}

export interface Activity {
  id: string;

  title: string;

  description?: string | null;

  ratingType: string;

  items: ActivityItem[];

  activityRatings: RatingWithFriendInfoQuery[];
}

export interface ActivityItem {
  itemId: string;

  name: string;

  link?: string | null;
}

export interface RatingWithFriendInfoQuery {
  activityId: string;

  friendId: string;

  itemRatings: FriendRating[];

  friendInfo?: Friend | null;
}

export interface FriendRating {
  itemId: string;

  rating?: string | null;
}

export interface UserInfo {
  id: string;

  username: string;

  firstName?: string | null;

  lastName?: string | null;

  image?: string | null;

  myActivities?: (string | null)[] | null;

  friendActivities?: (string | null)[] | null;

  pendingActivities?: (string | null)[] | null;
}

export interface Mutations {
  addActivityRatings?: RatingFromMutations | null;

  deleteActivityRatings?: DeleteActivityRating | null;

  updateActivityRatings?: UpdateActivityRatings | null;

  createActivity?: CreateActivityMutation | null;
}

export interface RatingFromMutations {
  insertedId?: string | null;

  insertedCount?: string | null;
}

export interface DeleteActivityRating {
  deletedCount?: string | null;
}

export interface UpdateActivityRatings {
  matchedCount?: string | null;
}

export interface CreateActivityMutation {
  insertedId?: string | null;

  insertedCount?: string | null;
}

// ====================================================
// Arguments
// ====================================================

export interface GetTiersActivityQueryArgs {
  id?: string | null;
}
export interface FriendQueryArgs {
  id?: string | null;
}
export interface ActivityQueryArgs {
  activityId: string;
}
export interface GetUserInfoQueryArgs {
  userId: string;
}
export interface AddActivityRatingsMutationsArgs {
  activityId: string;

  friendId: string;

  itemRatings: string;
}
export interface DeleteActivityRatingsMutationsArgs {
  activityId: string;

  friendId: string;
}
export interface UpdateActivityRatingsMutationsArgs {
  activityId: string;

  friendId: string;

  itemRatings: string;
}
export interface CreateActivityMutationsArgs {
  friendId: string;

  title: string;

  ratingType: string;

  description: string;

  items: string;
}

/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

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
  ratingType: string;
  items: ActivityItem[];
  activityRatings: RatingWithFriendInfoQuery[];
}

export interface ActivityItem {
  itemId: string;
  name: string;
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

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    getTiersActivity?: GetTiersActivityResolver<
      (FriendCategory | null)[] | null,
      any,
      Context
    >;
    friend?: FriendResolver<Friend | null, any, Context>;
    activity?: ActivityResolver<Activity | null, any, Context>;
    getUserInfo?: GetUserInfoResolver<UserInfo | null, any, Context>;
  }

  export type GetTiersActivityResolver<
    R = (FriendCategory | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, GetTiersActivityArgs>;
  export interface GetTiersActivityArgs {
    id?: string | null;
  }

  export type FriendResolver<
    R = Friend | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, FriendArgs>;
  export interface FriendArgs {
    id?: string | null;
  }

  export type ActivityResolver<
    R = Activity | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ActivityArgs>;
  export interface ActivityArgs {
    activityId: string;
  }

  export type GetUserInfoResolver<
    R = UserInfo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, GetUserInfoArgs>;
  export interface GetUserInfoArgs {
    userId: string;
  }
}

export namespace FriendCategoryResolvers {
  export interface Resolvers<Context = any> {
    friend?: FriendResolver<string | null, any, Context>;
    title?: TitleResolver<string | null, any, Context>;
    ratings?: RatingsResolver<(FriendScore | null)[] | null, any, Context>;
  }

  export type FriendResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TitleResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RatingsResolver<
    R = (FriendScore | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace FriendScoreResolvers {
  export interface Resolvers<Context = any> {
    name?: NameResolver<string | null, any, Context>;
    score?: ScoreResolver<string | null, any, Context>;
  }

  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ScoreResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace FriendResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    username?: UsernameResolver<string, any, Context>;
    firstName?: FirstNameResolver<string | null, any, Context>;
    lastName?: LastNameResolver<string | null, any, Context>;
    image?: ImageResolver<string | null, any, Context>;
    myActivities?: MyActivitiesResolver<(string | null)[] | null, any, Context>;
    friendActivities?: FriendActivitiesResolver<
      (string | null)[] | null,
      any,
      Context
    >;
    pendingActivities?: PendingActivitiesResolver<
      (string | null)[] | null,
      any,
      Context
    >;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsernameResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ImageResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MyActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FriendActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PendingActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ActivityResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    title?: TitleResolver<string, any, Context>;
    ratingType?: RatingTypeResolver<string, any, Context>;
    items?: ItemsResolver<ActivityItem[], any, Context>;
    activityRatings?: ActivityRatingsResolver<
      RatingWithFriendInfoQuery[],
      any,
      Context
    >;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type RatingTypeResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ItemsResolver<
    R = ActivityItem[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActivityRatingsResolver<
    R = RatingWithFriendInfoQuery[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ActivityItemResolvers {
  export interface Resolvers<Context = any> {
    itemId?: ItemIdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
  }

  export type ItemIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace RatingWithFriendInfoQueryResolvers {
  export interface Resolvers<Context = any> {
    activityId?: ActivityIdResolver<string, any, Context>;
    friendId?: FriendIdResolver<string, any, Context>;
    itemRatings?: ItemRatingsResolver<FriendRating[], any, Context>;
    friendInfo?: FriendInfoResolver<Friend | null, any, Context>;
  }

  export type ActivityIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FriendIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ItemRatingsResolver<
    R = FriendRating[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FriendInfoResolver<
    R = Friend | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace FriendRatingResolvers {
  export interface Resolvers<Context = any> {
    itemId?: ItemIdResolver<string, any, Context>;
    rating?: RatingResolver<string | null, any, Context>;
  }

  export type ItemIdResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RatingResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserInfoResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    username?: UsernameResolver<string, any, Context>;
    firstName?: FirstNameResolver<string | null, any, Context>;
    lastName?: LastNameResolver<string | null, any, Context>;
    image?: ImageResolver<string | null, any, Context>;
    myActivities?: MyActivitiesResolver<(string | null)[] | null, any, Context>;
    friendActivities?: FriendActivitiesResolver<
      (string | null)[] | null,
      any,
      Context
    >;
    pendingActivities?: PendingActivitiesResolver<
      (string | null)[] | null,
      any,
      Context
    >;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsernameResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ImageResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MyActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type FriendActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PendingActivitiesResolver<
    R = (string | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationsResolvers {
  export interface Resolvers<Context = any> {
    addActivityRatings?: AddActivityRatingsResolver<
      RatingFromMutations | null,
      any,
      Context
    >;
    deleteActivityRatings?: DeleteActivityRatingsResolver<
      DeleteActivityRating | null,
      any,
      Context
    >;
    updateActivityRatings?: UpdateActivityRatingsResolver<
      UpdateActivityRatings | null,
      any,
      Context
    >;
  }

  export type AddActivityRatingsResolver<
    R = RatingFromMutations | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AddActivityRatingsArgs>;
  export interface AddActivityRatingsArgs {
    activityId: string;
    friendId: string;
    itemRatings: string;
  }

  export type DeleteActivityRatingsResolver<
    R = DeleteActivityRating | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteActivityRatingsArgs>;
  export interface DeleteActivityRatingsArgs {
    activityId: string;
    friendId: string;
  }

  export type UpdateActivityRatingsResolver<
    R = UpdateActivityRatings | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateActivityRatingsArgs>;
  export interface UpdateActivityRatingsArgs {
    activityId: string;
    friendId: string;
    itemRatings: string;
  }
}

export namespace RatingFromMutationsResolvers {
  export interface Resolvers<Context = any> {
    insertedId?: InsertedIdResolver<string | null, any, Context>;
    insertedCount?: InsertedCountResolver<string | null, any, Context>;
  }

  export type InsertedIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type InsertedCountResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace DeleteActivityRatingResolvers {
  export interface Resolvers<Context = any> {
    deletedCount?: DeletedCountResolver<string | null, any, Context>;
  }

  export type DeletedCountResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UpdateActivityRatingsResolvers {
  export interface Resolvers<Context = any> {
    matchedCount?: MatchedCountResolver<string | null, any, Context>;
  }

  export type MatchedCountResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

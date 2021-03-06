import gql from "graphql-tag";

export const ACTIVITY_QUERY = gql`
  query Activity($activityId: String!) {
    activity(activityId: $activityId) {
      id
      title
      ratingType
      description
      items {
        itemId
        name
        link
      }
      activityRatings {
        activityId
        friendId
        friendInfo {
          firstName
          lastName
        }
        itemRatings {
          itemId
          rating
        }
      }
    }
  }
`;

export const ADD_ACTIVITY_RATING = gql`
  mutation addActivityRating(
    $activityId: String!
    $friendId: String!
    $itemRatings: String!
  ) {
    addActivityRatings(
      activityId: $activityId
      friendId: $friendId
      itemRatings: $itemRatings
    ) {
      insertedId
      insertedCount
    }
  }
`;

export const DELETE_ACTIVITY_RATING = gql`
  mutation deleteActivityRating($activityId: String!, $friendId: String!) {
    deleteActivityRatings(activityId: $activityId, friendId: $friendId) {
      deletedCount
    }
  }
`;

export const UPDATE_ACTIVITY_RATING = gql`
  mutation updateActivityRating(
    $activityId: String!
    $friendId: String!
    $itemRatings: String!
  ) {
    updateActivityRatings(
      activityId: $activityId
      friendId: $friendId
      itemRatings: $itemRatings
    ) {
      matchedCount
    }
  }
`;

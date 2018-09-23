import gql from "graphql-tag";

export const ACTIVITY_QUERY = gql`
  {
    activity(activityId: "5b9d837ee7179a7a9fc653fc") {
      id
      title
      ratingType
      items {
        itemId
        name
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

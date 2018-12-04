import gql from "graphql-tag";

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $friendId: String!
    $title: String!
    $ratingType: String!
    $description: String!
    $items: String!
  ) {
    createActivity(
      friendId: $friendId
      title: $title
      ratingType: $ratingType
      description: $description
      items: $items
    ) {
      insertedCount
    }
  }
`;

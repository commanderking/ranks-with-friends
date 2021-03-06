import gql from "graphql-tag";

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $title: String!
    $ratingType: String!
    $description: String!
    $items: String!
  ) {
    createActivity(
      title: $title
      ratingType: $ratingType
      description: $description
      items: $items
    ) {
      insertedCount
    }
  }
`;

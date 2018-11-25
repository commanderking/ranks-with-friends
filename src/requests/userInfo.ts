import gql from "graphql-tag";

export const GET_USER_INFO = gql`
  query GetUserInfo($userId: String!) {
    getUserInfo(userId: $userId) {
      id
      firstName
      myActivities
      friendActivities
    }
  }
`;

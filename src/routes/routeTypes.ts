import { UserInfo } from "../serverTypes/graphql";

export interface RouteProps {
  match: {
    params: {
      activityId: string;
    };
  };
  location: {
    search: string;
  };
  userInfo: UserInfo;
}

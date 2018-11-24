import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Query } from "react-apollo";
import queryString from "query-string";
import { GET_USER_INFO } from "../requests/userInfo";

import TierTableContainer from "../features/tiertable/TierTableContainer";
import TierTableEditContainer from "../features/tiertable/TierTableEditContainer";
const routes = [
  {
    path: "/",
    component: () => <div>Home Page</div>,
    exact: true
  },
  {
    path: "/activity/:activityId",
    component: TierTableContainer,
    exact: true
  },
  {
    path: "/activity/edit/:activityId",
    component: TierTableEditContainer,
    exact: true
  }
];

const RouteConfig = () => {
  // This is temporary until we get userId from the backend on login
  const userId = queryString.parse(window.location.search).user;
  return (
    <Router>
      <div>
        <Query query={GET_USER_INFO} variables={{ userId }}>
          {(data, loading, error) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            return routes.map((route, i) => (
              <Route
                key={`Route-${i}`}
                path={route.path}
                exact={route.exact}
                render={props => {
                  return <route.component userId={userId} {...props} />;
                }}
              />
            ));
          }}
        </Query>
      </div>
    </Router>
  );
};

export default RouteConfig;

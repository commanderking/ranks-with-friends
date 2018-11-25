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
  console.log("hey");
  console.log(window.location);
  console.log("what");
  console.log(window.location.search);
  const userId =
    window.location && window.location.search !== ""
      ? queryString.parse(window.location.search).user
      : null;
  console.log("userId", userId);
  return (
    <Router>
      <div>
        {userId ? (
          <Query query={GET_USER_INFO} variables={{ userId }}>
            {({ loading, error, data }) => {
              console.log("data", data);
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error...</p>;
              return routes.map((route, i) => (
                <Route
                  key={`Route-${i}`}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <route.component userInfo={data.getUserInfo} {...props} />
                  )}
                />
              ));
            }}
          </Query>
        ) : (
          <div>
            {routes.map((route, i) => (
              <Route
                key={`Route-${i}`}
                path={route.path}
                exact={route.exact}
                render={props => <route.component userInfo={null} {...props} />}
              />
            ))}
          </div>
        )}
      </div>
    </Router>
  );
};

export default RouteConfig;

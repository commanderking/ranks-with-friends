import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TierTableContainer from "../features/tiertable/TierTableContainer";

const routes = [
  {
    path: "/",
    component: () => <div>Home Page</div>,
    exact: true
  },
  {
    path: "/activity/:activityId",
    component: TierTableContainer
  }
];

const RouteConfig = () => (
  <Router>
    <div>
      {routes.map((route, i) => (
        <Route
          key={`Route-${i}`}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </div>
  </Router>
);

export default RouteConfig;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

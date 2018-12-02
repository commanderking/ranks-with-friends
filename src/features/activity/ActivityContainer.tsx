import React from "react";
import { RouteProps } from "../../routes/routeTypes";
import { Link } from "react-router-dom";
class ActivityContainer extends React.Component<RouteProps> {
  render() {
    const { userInfo } = this.props;
    console.log("userInfo", userInfo);
    return (
      <div>
        <h3>View All Activities</h3>
        <Link to="/activity/create">
          <button>Create New Activity</button>
        </Link>
      </div>
    );
  }
}

export default ActivityContainer;

import React from "react";
import Modal from "react-modal";
import TierTable from "./TierTable";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import { RouteProps } from "../../routes/routeTypes";
import {
  userHasRatingsForActivity,
  canUserViewActivity
} from "./tierTableUtils";
import StartRatingModal from "./components/StartRatingModal";
import { css } from "react-emotion";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export interface TierTableState {
  itemRatings: Array<FriendRating>;
  isModalOpen: boolean;
}

class TierTableContainer extends React.Component<RouteProps, TierTableState> {
  constructor(props: RouteProps) {
    super(props);
    this.state = {
      itemRatings: [],
      isModalOpen: false
    };
  }

  render() {
    const { match, userInfo } = this.props;
    const userId = (userInfo && userInfo.id) || null;
    const activityId = match.params.activityId;
    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          if (userId && !canUserViewActivity(activityId, userInfo))
            return <p>Sorry! You don't have access to this activity.</p>;
          // If user doesn't exist, we still want a public facing page so modal should
          // never be open if no userId has been entered into the url
          const isModalOpen = userId
            ? !userHasRatingsForActivity(data.activity.activityRatings, userId)
            : false;

          if (data && data.activity) {
            const { title, description } = data.activity;
            return (
              <div
                className={
                  isModalOpen
                    ? css`
                        filter: blur(0.3rem);
                      `
                    : ""
                }
              >
                {userId && (
                  <StartRatingModal
                    isModalOpen={isModalOpen}
                    userId={userId}
                    activityId={activityId}
                    userInfo={userInfo}
                  />
                )}
                <h1>{title}</h1>
                {description && <p>{description}</p>}
                {userId && (
                  <Link
                    to={{
                      pathname: `/activity/ratings/edit/${activityId}`,
                      search: `?user=${userId}`
                    }}
                  >
                    <button>Edit Ratings</button>
                  </Link>
                )}
                <TierTable data={data} userId={userId} />
              </div>
            );
          }
          return <div>Could not get needed data</div>;
        }}
      </Query>
    );
  }
}

export default TierTableContainer;

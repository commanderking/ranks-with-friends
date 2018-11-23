import React from "react";
import Modal from "react-modal";
import TierTable from "./TierTable";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import queryString from "query-string";
import { userHasRatingsForActivity } from "./tierTableUtils";
import StartRatingModal from "./components/StartRatingModal";
import { css } from "react-emotion";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export interface TierTableState {
  itemRatings: Array<FriendRating>;
  isModalOpen: boolean;
}

interface TierTableProps {
  match: {
    params: {
      activityId: string;
    };
  };
  location: {
    search: string;
  };
}

// Lin - const MOCK_LOGGED_IN_FRIEND = "5ba4414936437b9095fc6144";
// Jeffrey - 5b9d83af36437b9095cc3122
// Allison - 5b9d83af36437b9095cc3121

// testUser - 5bf22d3ce7179a56e2124e7b

class TierTableContainer extends React.Component<
  TierTableProps,
  TierTableState
> {
  constructor(props: TierTableProps) {
    super(props);
    this.state = {
      itemRatings: [],
      isModalOpen: false
    };
  }

  setRating = ({ itemId, rating }: FriendRating) => {
    const newItemRatings = [...this.state.itemRatings, { itemId, rating }];
    this.setState({
      itemRatings: newItemRatings
    });
  };

  render() {
    const { match, location } = this.props;
    const userId = queryString.parse(location.search).user;
    const activityId = match.params.activityId;
    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const hasCompleteData = data && data.activity && userId;
          if (hasCompleteData) {
            return (
              <div
                className={
                  !userHasRatingsForActivity(
                    data.activity.activityRatings,
                    userId
                  )
                    ? css`
                        filter: blur(0.3rem);
                      `
                    : ""
                }
              >
                <h1>{data.activity.title}</h1>
                <Link
                  to={{
                    pathname: `/activity/edit/${activityId}`,
                    search: `?user=${userId}`
                  }}
                >
                  <button>Edit Ratings</button>
                </Link>
                <div>
                  <StartRatingModal
                    isModalOpen={
                      !userHasRatingsForActivity(
                        data.activity.activityRatings,
                        userId
                      )
                    }
                    userId={userId}
                    activityId={activityId}
                  />
                  <TierTable
                    data={data}
                    setRating={this.setRating}
                    userId={userId}
                  />
                </div>
              </div>
            );
          }
          return (
            <div>
              <span>Could not get needed data</span>
              <ul>{!userId && <li>No user Id found </li>}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default TierTableContainer;

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

          // If user doesn't exist, we still want a public facing page so modal should
          // never be open if no userId has been entered into the url
          const isModalOpen = userId
            ? !userHasRatingsForActivity(data.activity.activityRatings, userId)
            : false;
          if (data && data.activity) {
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
                <StartRatingModal
                  isModalOpen={isModalOpen}
                  userId={userId}
                  activityId={activityId}
                />
                <h1>{data.activity.title}</h1>
                {userId && (
                  <Link
                    to={{
                      pathname: `/activity/edit/${activityId}`,
                      search: `?user=${userId}`
                    }}
                  >
                    <button>Edit Ratings</button>
                  </Link>
                )}
                <TierTable
                  data={data}
                  setRating={this.setRating}
                  userId={userId}
                />
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

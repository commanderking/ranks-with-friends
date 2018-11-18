import React from "react";
import TierTable from "./TierTable";
import { Query } from "react-apollo";
import { ACTIVITY_QUERY } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import queryString from "query-string";
import TierTableEdit from "./components/TierTableEdit";
export interface TierTableState {
  itemRatings: Array<FriendRating>;
  editMode: boolean;
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

class TierTableContainer extends React.Component<
  TierTableProps,
  TierTableState
> {
  constructor(props: TierTableProps) {
    super(props);
    this.state = {
      itemRatings: [],
      editMode: false
    };
  }

  setRating = ({ itemId, rating }: FriendRating) => {
    const newItemRatings = [...this.state.itemRatings, { itemId, rating }];
    this.setState({
      itemRatings: newItemRatings
    });
  };

  enterEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  leaveEditMode = () => {
    this.setState({
      editMode: false
    });
  };

  componentDidMount() {
    const mode = queryString.parse(location.search).mode;
    if (mode === "edit") {
      this.setState({
        editMode: true
      });
    }
  }

  render() {
    const { editMode } = this.state;
    const { match, location } = this.props;
    const userId = queryString.parse(location.search).user;
    const activityId = match.params.activityId;
    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const hasCompleteData = data && data.activity && userId;
          if (hasCompleteData && !editMode) {
            return (
              <div>
                <h1>{data.activity.title}</h1>
                <div>
                  <TierTable
                    data={data}
                    setRating={this.setRating}
                    userId={userId}
                  />
                </div>
                <button onClick={this.enterEditMode}>Edit Ratings</button>
              </div>
            );
          }
          if (hasCompleteData && editMode) {
            return (
              <TierTableEdit
                data={data}
                userId={userId}
                activityId={activityId}
                leaveEditMode={this.leaveEditMode}
              />
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

import React from "react";
import TierTable from "./TierTable";
import { Query, Mutation } from "react-apollo";
import { ACTIVITY_QUERY, ADD_ACTIVITY_RATING } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import { hasFriendCompletedActivityRating } from "./tierTableUtils";
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

  componentDidMount() {
    const mode = queryString.parse(location.search).mode;
    if (mode === "edit") {
      this.setState({
        editMode: true
      });
    }
  }

  render() {
    const { itemRatings, editMode } = this.state;
    const { match, location } = this.props;
    const userId = queryString.parse(location.search).user;
    const activityId = match.params.activityId;
    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const hasCompleteData = data && data.activity && userId;
          console.log(data);
          if (hasCompleteData && !editMode) {
            return (
              <div>
                <h1>{data.activity.title}</h1>
                <Mutation
                  mutation={ADD_ACTIVITY_RATING}
                  key={"AddActivityRating"}
                  refetchQueries={() => [
                    {
                      query: ACTIVITY_QUERY,
                      variables: { activityId }
                    }
                  ]}
                  awaitRefetchQueries
                >
                  {(
                    addActivityRating,
                    { loading: mutationLoading, data: mutationData }
                  ) => {
                    if (mutationLoading) return <p>Loading...</p>;

                    return (
                      <div>
                        <TierTable
                          data={data}
                          setRating={this.setRating}
                          userId={userId}
                        />
                        {hasFriendCompletedActivityRating(
                          data.activity,
                          userId
                        ) && (
                          <button
                            onClick={e => {
                              addActivityRating({
                                variables: {
                                  activityId,
                                  friendId: userId,
                                  itemRatings: JSON.stringify(itemRatings)
                                }
                              });
                            }}
                          >
                            Confirm Ratings
                          </button>
                        )}
                      </div>
                    );
                  }}
                </Mutation>
                <button onClick={this.enterEditMode}>Edit Ratings</button>
              </div>
            );
          }
          if (hasCompleteData && editMode) {
            return <TierTableEdit data={data} userId={userId} />;
          }
          return <div>Could not get needed data</div>;
        }}
      </Query>
    );
  }
}

export default TierTableContainer;

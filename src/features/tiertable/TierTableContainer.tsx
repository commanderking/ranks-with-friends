import React from "react";
import TierTable from "./TierTable";
import { Query, Mutation } from "react-apollo";
import { ACTIVITY_QUERY, ADD_ACTIVITY_RATING } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import { hasFriendCompletedActivityRating } from "./tierTableUtils";
import queryString from "query-string";
export interface TierTableState {
  itemRatings: Array<FriendRating>;
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
      itemRatings: []
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

          return (
            data &&
            data.activity &&
            userId && (
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
                                  itemRatings: JSON.stringify(
                                    this.state.itemRatings
                                  )
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
              </div>
            )
          );
        }}
      </Query>
    );
  }
}

export default TierTableContainer;

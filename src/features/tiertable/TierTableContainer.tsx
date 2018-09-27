import React from "react";
import TierTable from "./TierTable";
import { Query, Mutation } from "react-apollo";
import { ACTIVITY_QUERY, ADD_ACTIVITY_RATING } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";
import { hasFriendCompletedActivityRating } from "./tierTableUtils";

export interface TierTableState {
  itemRatings: Array<FriendRating>;
}

interface TierTableProps {
  match: {
    params: {
      activityId: string;
    };
  };
}

const MOCK_LOGGED_IN_FRIEND = "5ba4414936437b9095fc6144";

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
    const { match } = this.props;
    const activityId = match.params.activityId;
    return (
      <Query query={ACTIVITY_QUERY} variables={{ activityId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            data &&
            data.activity && (
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
                          userId={MOCK_LOGGED_IN_FRIEND}
                        />
                        {hasFriendCompletedActivityRating(
                          data.activity,
                          MOCK_LOGGED_IN_FRIEND
                        ) && (
                          <button
                            onClick={e => {
                              addActivityRating({
                                variables: {
                                  activityId,
                                  friendId: MOCK_LOGGED_IN_FRIEND,
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

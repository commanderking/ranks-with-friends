import React from "react";
import TierTable from "./TierTable";
import { Query, Mutation } from "react-apollo";
import { ACTIVITY_QUERY, ADD_ACTIVITY_RATING } from "./TierTableQueries";
import { FriendRating } from "../../serverTypes/graphql";

export interface TierTableState {
  itemRatings: Array<FriendRating>;
}

class TierTableContainer extends React.Component<{}, TierTableState> {
  constructor(props: Object) {
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
    return (
      <Query query={ACTIVITY_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            data &&
            data.activity && (
              <div>
                <h1>{data.activity.title}</h1>

                <TierTable data={data} setRating={this.setRating} />
                <Mutation
                  mutation={ADD_ACTIVITY_RATING}
                  key={"AddActivityRating"}
                >
                  {(addActivityRating, { data }) => (
                    <button
                      onClick={e => {
                        addActivityRating({
                          variables: {
                            activityId: "5b9d837ee7179a7a9fc653fc",
                            friendId: "5ba4414936437b9095fc6144",
                            itemRatings: JSON.stringify(this.state.itemRatings)
                          }
                        });
                      }}
                    >
                      Confirm Ratings
                    </button>
                  )}
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
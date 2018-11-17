import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import UnrankedDropArea from "./UnrankedDropArea";
import RankedItemsDropArea from "./RankedItemsDropArea";
import { Activity } from "../../../serverTypes/graphql";
import {
  groupItemsByUserRanking,
  reorderRankings,
  getItemsWithoutRankings,
  flattenRatedItemsIntoArray
} from "../tierTableUtils";
import { Mutation } from "react-apollo";
import {
  ItemWithUserRating,
  ItemWithUserRatingByRating
} from "../TierTableTypes";
import { UPDATE_ACTIVITY_RATING } from "../TierTableQueries";

interface TierTableEditProps {
  data: {
    activity: Activity;
  };
  userId: string;
  activityId: string;
  leaveEditMode: Function;
}

interface TierTableEditState {
  itemsByRanking: ItemWithUserRatingByRating;
  unrankedItems: Array<ItemWithUserRating>;
}

class TierTableEdit extends React.Component<
  TierTableEditProps,
  TierTableEditState
> {
  constructor(props: TierTableEditProps) {
    super(props);
    this.state = {
      itemsByRanking: { Unranked: [] },
      unrankedItems: []
    };
  }

  onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { itemsByRanking, unrankedItems } = reorderRankings(
      this.state.itemsByRanking,
      this.state.unrankedItems,
      result.source,
      result.destination
    );

    this.setState({
      itemsByRanking,
      unrankedItems
    });
  };

  getRatingsToSubmit = () => {
    const ratedItems = flattenRatedItemsIntoArray(this.state.itemsByRanking);
    return ratedItems;
  };

  componentDidMount() {
    const { data, userId } = this.props;

    this.setState({
      itemsByRanking: groupItemsByUserRanking(data.activity, userId),
      unrankedItems: getItemsWithoutRankings(data.activity, userId)
    });
  }

  render() {
    const { userId, activityId, leaveEditMode } = this.props;
    const { itemsByRanking, unrankedItems } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Edit your Ratings</h1>
        <Mutation
          mutation={UPDATE_ACTIVITY_RATING}
          key={"updateActivityRating"}
        >
          {(updateActivityRating, { loading: mutationLoading }) => {
            if (mutationLoading) return <p>Loading...</p>;

            return (
              <button
                onClick={e => {
                  updateActivityRating({
                    variables: {
                      activityId,
                      friendId: userId,
                      itemRatings: JSON.stringify(this.getRatingsToSubmit())
                    }
                  });
                }}
              >
                Confirm Ratings
              </button>
            );
          }}
        </Mutation>
        <button onClick={() => leaveEditMode()}>Exit Edit Mode</button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 5fr"
          }}
        >
          <UnrankedDropArea unrankedItems={unrankedItems} />
          <RankedItemsDropArea itemsByRanking={itemsByRanking} />
        </div>
      </DragDropContext>
    );
  }
}

export default TierTableEdit;

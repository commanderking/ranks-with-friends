import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import UnrankedDropArea from "./UnrankedDropArea";
import RankedItemsDropArea from "./RankedItemsDropArea";
import { Activity } from "../../../serverTypes/graphql";
import {
  groupItemsByUserRanking,
  reorderRankings,
  getItemsWithoutRankings,
  flattenRatedItemsIntoArray,
  userHasRatingsForActivity
} from "../tierTableUtils";
import {
  ItemWithUserRating,
  ItemWithUserRatingByRating
} from "../TierTableTypes";
import { UpdateRatingButton } from "./UpdateRatingButton";
import { NewRatingButton } from "./NewRatingButton";
import { css } from "emotion";

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
    return JSON.stringify(ratedItems);
  };

  componentDidMount() {
    const { data, userId } = this.props;

    this.setState({
      itemsByRanking: groupItemsByUserRanking(data.activity, userId),
      unrankedItems: getItemsWithoutRankings(data.activity, userId)
    });
  }

  render() {
    const { data, userId, activityId, leaveEditMode } = this.props;
    const { itemsByRanking, unrankedItems } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Edit your Ratings</h1>
        {userHasRatingsForActivity(data.activity.activityRatings, userId) ? (
          <UpdateRatingButton
            userId={userId}
            activityId={activityId}
            itemRatings={this.getRatingsToSubmit()}
          />
        ) : (
          <NewRatingButton
            userId={userId}
            activityId={activityId}
            itemRatings={this.getRatingsToSubmit()}
          />
        )}
        <button onClick={() => leaveEditMode()}>Exit Edit Mode</button>
        <div
          className={css`
            display: -ms-grid;
            display: -webkit-grid;
            display: grid;
            grid-template-columns: 1fr 5fr;
            grid-template-areas: "unranked ranked";
          `}
        >
          <UnrankedDropArea unrankedItems={unrankedItems} />
          <RankedItemsDropArea itemsByRanking={itemsByRanking} />
        </div>
      </DragDropContext>
    );
  }
}

export default TierTableEdit;

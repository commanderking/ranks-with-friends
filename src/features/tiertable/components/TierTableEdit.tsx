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
import {
  ItemWithUserRating,
  ItemWithUserRatingByRating
} from "../TierTableTypes";
interface TierTableEditProps {
  data: {
    activity: Activity;
  };
  userId: string;
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

  submitRatings = () => {
    const ratedItems = flattenRatedItemsIntoArray(this.state.itemsByRanking);
    console.log("ratedItems", ratedItems);
  };

  componentDidMount() {
    const { data, userId } = this.props;

    this.setState({
      itemsByRanking: groupItemsByUserRanking(data.activity, userId),
      unrankedItems: getItemsWithoutRankings(data.activity, userId)
    });
  }

  render() {
    const { itemsByRanking, unrankedItems } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Edit your Ratings</h1>
        <button
          onClick={() => {
            this.submitRatings();
          }}
        >
          Submit New Ratings
        </button>
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

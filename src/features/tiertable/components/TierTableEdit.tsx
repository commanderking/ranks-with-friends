import React from "react";
import Modal from "react-modal";
import { css } from "emotion";
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
import RatingConfirmationModal from "./RatingConfirmationModal";
import { Link } from "react-router-dom";

interface TierTableEditProps {
  data: {
    activity: Activity;
  };
  userId: string;
  activityId: string;
}

interface TierTableEditState {
  itemsByRanking: ItemWithUserRatingByRating;
  unrankedItems: Array<ItemWithUserRating>;
  modalIsOpen: boolean;
}

Modal.setAppElement("#root");

const blurredEdit = css`
  filter: blur(0.1rem);
`;

class TierTableEdit extends React.Component<
  TierTableEditProps,
  TierTableEditState
> {
  constructor(props: TierTableEditProps) {
    super(props);
    this.state = {
      itemsByRanking: { Unranked: [] },
      unrankedItems: [],
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

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
    const { data, userId, activityId } = this.props;
    const { itemsByRanking, unrankedItems, modalIsOpen } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={modalIsOpen ? blurredEdit : ""}>
          <h1>Edit your Ratings</h1>
          {userHasRatingsForActivity(data.activity.activityRatings, userId) ? (
            <UpdateRatingButton
              userId={userId}
              activityId={activityId}
              itemRatings={this.getRatingsToSubmit()}
              openModal={this.openModal}
            />
          ) : (
            <NewRatingButton
              userId={userId}
              activityId={activityId}
              itemRatings={this.getRatingsToSubmit()}
              openModal={this.openModal}
            />
          )}
          <RatingConfirmationModal
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
            userId={userId}
            activityId={activityId}
          />
          <Link
            to={{
              pathname: `/activity/${activityId}`,
              search: `?user=${userId}`
            }}
          >
            <button>Exit Edit Mode</button>
          </Link>
          <div
            className={css`
              display: grid;
              grid-template-columns: 1fr 5fr;
              grid-template-areas: "unranked ranked";
              padding: 20px;
              border: 2px solid black;
              margin: 5px;
            `}
          >
            <UnrankedDropArea unrankedItems={unrankedItems} />
            <RankedItemsDropArea itemsByRanking={itemsByRanking} />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default TierTableEdit;

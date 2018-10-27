import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import _ from "lodash";
import { Activity } from "../../../serverTypes/graphql";
import { groupItemsByUserRanking, reorderRankings } from "../tierTableUtils";
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
}

const getDroppableStyle = () => ({
  backgroundColor: "orange",
  display: "flex",
  padding: "8px",
  margin: "8px",
  overflow: "auto"
});

class TierTableEdit extends React.Component<
  TierTableEditProps,
  TierTableEditState
> {
  constructor(props: TierTableEditProps) {
    super(props);
    this.state = {
      itemsByRanking: { Unranked: [] }
    };
  }

  onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const itemsByRanking = reorderRankings(
      this.state.itemsByRanking,
      result.source,
      result.destination
    );

    this.setState({
      itemsByRanking
    });
  };

  componentDidMount() {
    const { data, userId } = this.props;
    this.setState({
      itemsByRanking: groupItemsByUserRanking(data.activity, userId)
    });
  }

  render() {
    const { itemsByRanking } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Edit your Ratings</h1>

        {_.map(itemsByRanking, (itemsInGroup, key) => {
          return (
            <div>
              <h2>{key}</h2>

              <Droppable droppableId={`${key}`} direction="horizontal">
                {provided => {
                  return (
                    <div
                      style={getDroppableStyle()}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {itemsInGroup.map(
                        (item: ItemWithUserRating, index: number) => (
                          <Draggable
                            draggableId={item.itemId}
                            key={item.itemId}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  backgroundColor: "gray",
                                  height: "50px",
                                  padding: "8px",
                                  margin: "0 8px 0 0",
                                  overflow: "auto",
                                  ...provided.draggableProps.style
                                }}
                              >
                                {item.name}
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    );
  }
}

export default TierTableEdit;

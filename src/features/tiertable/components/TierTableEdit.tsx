import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import _ from "lodash";
import { Activity } from "../../../serverTypes/graphql";
import {
  groupItemsByUserRanking,
  reorderRankings,
  getItemsWithoutRankings
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

const getDroppableStyle = () => ({
  backgroundColor: "orange",
  display: "flex",
  padding: "8px",
  margin: "8px",
  overflow: "auto"
});

const getDroppableVerticalStyle = () => ({
  backgroundColor: "orange",
  padding: "8px"
});

const getDraggableItemStyle = (provided: any) => ({
  userSelect: "none",
  backgroundColor: "gray",
  height: "50px",
  padding: "8px",
  margin: "0 8px 0 0",
  overflow: "auto",
  ...provided.draggableProps.style
});

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

    console.log("unrankedItems", unrankedItems);

    this.setState({
      itemsByRanking,
      unrankedItems
    });
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr"
          }}
        >
          <div id="tier-unranked-wrapper">
            <h2> Unranked</h2>
            <Droppable
              droppableId="unranked"
              direction="vertical"
              key="unranked-drop-area"
            >
              {provided => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getDroppableVerticalStyle()}
                  >
                    {unrankedItems.map((item, index) => {
                      return (
                        <div>
                          <Draggable
                            draggableId={item.itemId}
                            key={item.itemId}
                            index={index}
                          >
                            {provided => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getDraggableItemStyle(provided)}
                              >
                                {item.name}
                              </div>
                            )}
                          </Draggable>
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
          <div id="tiers-wrapper">
            {_.map(itemsByRanking, (itemsInGroup, key) => {
              return (
                <div id={`tier-${key}-wrapper`} key={`tier-${key}-wrapper`}>
                  <h2>{key}</h2>

                  <Droppable
                    droppableId={`${key}`}
                    key={key}
                    direction="horizontal"
                  >
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
                                {provided => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getDraggableItemStyle(provided)}
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
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default TierTableEdit;

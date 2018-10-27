import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { Activity } from "../../../serverTypes/graphql";
import {
  getItemsWithUserRankings,
  groupItemsByUserRanking
} from "../tierTableUtils";
interface TierTableEditProps {
  data: {
    activity: Activity;
  };
  userId: string;
}

const getDroppableStyle = () => ({
  backgroundColor: "orange",
  display: "flex",
  padding: "8px",
  margin: "8px",
  overflow: "auto"
});

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderRankings = (
  itemsByRanking: Array<any>,
  source: any,
  destination: any
) => {
  console.log("source", source);
  console.log("destination", destination);
  const current = [...itemsByRanking[source.droppableId]];
  const next = [...itemsByRanking[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...itemsByRanking,
      [source.droppableId]: reordered
    };
    return result;
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...itemsByRanking,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };

  return result;
};

class TierTableEdit extends React.Component<TierTableEditProps, any> {
  constructor(props: TierTableEditProps) {
    super(props);
    this.state = {
      items: [],
      itemsByGroup: []
    };
  }
  onDragStart = (initial: any) => {};

  onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log("itemsByGroup", this.state.itemsByGroup);
    const itemsByGroup = reorderRankings(
      this.state.itemsByGroup,
      result.source,
      result.destination
    );

    console.log("itemsByGroup", itemsByGroup);

    this.setState({
      itemsByGroup
    });
  };

  componentDidMount() {
    const { data, userId } = this.props;
    console.log("test", groupItemsByUserRanking(data.activity, userId));
    this.setState({
      items: getItemsWithUserRankings(data.activity, userId),
      itemsByGroup: groupItemsByUserRanking(data.activity, userId)
    });
  }

  render() {
    /*
    const { data, userId } = this.props;
    console.log("data", this.props.data.activity);
    const itemsWithUserRankings = getItemsWithUserRankings(
      data.activity,
      userId
    );
    */
    const { itemsByGroup } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <h1>Edit your Ratings</h1>

        {_.map(itemsByGroup, (itemsInGroup, key) => {
          console.log("key", key);
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
                      {itemsInGroup.map((item: any, index: any) => (
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
                      ))}
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

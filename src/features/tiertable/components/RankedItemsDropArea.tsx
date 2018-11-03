import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { ItemWithUserRating } from "../TierTableTypes";

const getDroppableStyle = () => ({
  backgroundColor: "orange",
  display: "flex",
  padding: "8px",
  margin: "8px",
  overflow: "auto"
});

const getDraggableItemStyle = (provided: any) => ({
  userSelect: "none",
  backgroundColor: "gray",
  height: "50px",
  padding: "8px",
  margin: "8px 8px",
  minWidth: "100px",
  maxWidth: "150px",
  overflow: "auto",
  ...provided.draggableProps.style
});

const RankedItemsDropArea = ({ itemsByRanking }: any) => {
  return (
    <div id="tiers-wrapper">
      <h2> Your Rankings</h2>
      {_.map(itemsByRanking, (itemsInGroup, key) => {
        return (
          <div
            id={`tier-${key}-wrapper`}
            key={`tier-${key}-wrapper`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 9fr"
            }}
          >
            <h2>{key}</h2>

            <Droppable droppableId={`${key}`} key={key} direction="horizontal">
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
  );
};

export default RankedItemsDropArea;

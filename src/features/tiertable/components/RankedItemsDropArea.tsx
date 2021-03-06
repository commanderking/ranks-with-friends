import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { ItemWithUserRating } from "../TierTableTypes";
import DraggableTile from "./DraggableTile";
import { css } from "emotion";

const RankedItemsDropArea = ({ itemsByRanking }: any) => {
  return (
    <div id="tiers-wrapper">
      <h2>Your Ratings</h2>
      {_.map(itemsByRanking, (itemsInGroup, key) => {
        return (
          <div
            id={`tier-${key}-wrapper`}
            key={`tier-${key}-wrapper`}
            className={css`
              display: grid;
              grid-template-columns: 1fr 14fr;
              margin-bottom: 8px;
              min-height: 89px;
            `}
          >
            <h2
              className={css`
                display: flex;
                justify-content: center;
                align-content: right;
                flex-direction: column;
                text-align: right;
                padding-right: 10px;
              `}
            >
              {key}
            </h2>

            <Droppable droppableId={`${key}`} key={key} direction="horizontal">
              {provided => {
                return (
                  <div
                    className={css`
                      background-color: rgba(255, 0, 0, 0.7);
                      display: flex;
                      overflow: auto;
                      padding: 8px;
                    `}
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
                            >
                              <DraggableTile>{item.name}</DraggableTile>
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

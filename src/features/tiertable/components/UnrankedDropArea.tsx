import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableTile from "./DraggableTile";
import { css } from "react-emotion";

const UnrankedDropArea = ({ unrankedItems }: any) => {
  return (
    <div id="tier-unranked-wrapper">
      <h2>Unrated Items</h2>
      <div
        className={css`
          padding-top: 25px;
          padding-bottom: 25px;
          background-color: rgba(255, 0, 0, 0.7);
        `}
      >
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
                className={css`
                  max-height: 450px;
                  overflow: scroll;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                `}
              >
                {unrankedItems.map((item: any, index: any) => {
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
                          >
                            <DraggableTile>
                              <a href={item.link} target="_blank">
                                {item.name}
                              </a>
                            </DraggableTile>
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
    </div>
  );
};

export default UnrankedDropArea;

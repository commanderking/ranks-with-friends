import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableTile from "./DraggableTile";
import { css } from "react-emotion";

const UnrankedDropArea = ({ unrankedItems }: any) => {
  return (
    <div id="tier-unranked-wrapper">
      <h2>Unrated Items</h2>
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
                background-color: rgba(255, 0, 0, 0.7);
                max-height: 500px;
                overflow: scroll;
                display: flex;
                flex-direction: column;
                padding: 8px 8px 0;
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
                          <DraggableTile dropAreaType="vertical">
                            {item.name}
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
  );
};

export default UnrankedDropArea;

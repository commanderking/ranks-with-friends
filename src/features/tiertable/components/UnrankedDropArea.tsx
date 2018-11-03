import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const getDroppableVerticalStyle = () => ({
  backgroundColor: "orange",
  padding: "8px"
});

const UnrankedDropArea = ({ unrankedItems }: any) => {
  return (
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
  );
};

export default UnrankedDropArea;

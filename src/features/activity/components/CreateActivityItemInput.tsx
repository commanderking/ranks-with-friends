import React from "react";
import { Item } from "../CreateActivityTypes";

const CreateActivityItemInput = ({
  items,
  index,
  handleItemNameChange,
  handleItemLinkChange
}: {
  items: { [key: string]: Item };
  index: number;
  handleItemNameChange: Function;
  handleItemLinkChange: Function;
}) => {
  return (
    <div>
      <div>Item {index}</div>
      <label>Item Name</label>
      <input
        type="text"
        value={(items[index] && items[index].name) || ""}
        onChange={event => {
          handleItemNameChange(event, index);
        }}
      />
      <label>Item Link</label>
      <input
        type="text"
        value={(items[index] && items[index].link) || ""}
        onChange={event => {
          handleItemLinkChange(event, index);
        }}
      />
    </div>
  );
};
export default CreateActivityItemInput;

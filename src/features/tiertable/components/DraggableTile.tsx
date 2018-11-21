import styled from "react-emotion";
const DraggableTile = styled("div")`
  user-select: none;
  background-color: white;
  height: 50px;
  padding: 8px;
  width: 150px;
  overflow: auto;
  border-width: 3px;
  border-style: solid;
  border-color: grey;

  // Related to centering text (vertically and horizontally) in the draggable area
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin-right: 6px;
  margin-bottom: 1px;
`;

export default DraggableTile;

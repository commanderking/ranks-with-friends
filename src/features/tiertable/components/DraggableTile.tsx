import styled, { css } from "react-emotion";

interface DraggableTileProps {
  dropAreaType: "horizontal" | "vertical";
}

const dropAreaTypeStyle = (props: DraggableTileProps): string => {
  const { dropAreaType } = props;

  if (dropAreaType === "horizontal") {
    return css`
      margin: 8px 8px;
    `;
  }
  if (dropAreaType === "vertical") {
    return css`
      margin: auto;
      margin-bottom: 16px;
      margin-top: 8px;
    `;
  }
  return "";
};

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
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  ${dropAreaTypeStyle}
`;

export default DraggableTile;

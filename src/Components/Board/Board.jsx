import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";

/**
 * shapes: [{ name: string, width: number, height: number, top: number, left: number }]
 */
const Board = (props) => {
  const {
    shapes,
    width,
    height,
    setHoveredShape,
    hoveredShape,
    isHoverEnabled,
  } = props;

  return (
    <div style={styles.shapesBoxContainer}>
      <div style={styles.shapesBox(width, height)}>
        {shapes?.map((shape, index) => (
          <div
            onMouseEnter={() => setHoveredShape(index)}
            onMouseLeave={() => setHoveredShape(-1)}
            style={styles.shape(
              parseInt(shape?.width),
              parseInt(shape?.height),
              parseInt(shape?.top),
              parseInt(shape?.left),
              hoveredShape === index && isHoverEnabled
            )}
          >
            {shape.name}
          </div>
        ))}
      </div>
    </div>
  );
};

Board.propTypes = {
  shapes: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  setHoveredShape: PropTypes.func,
  hoveredShape: PropTypes.number,
  isHoverEnabled: PropTypes.bool,
};

export default Board;

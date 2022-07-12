import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";

/**
 * shapes: [{ name: string, width: number, height: number, top: number, left: number }]
 */
const Board = (props) => {
  const { shapes, width, height } = props;

  return (
    <div style={styles.shapesBoxContainer}>
      <div style={styles.shapesBox(width, height)}>
        {shapes?.map((shape) => (
          <div
            style={styles.shape(
              parseInt(shape?.width),
              parseInt(shape?.height),
              parseInt(shape?.top),
              parseInt(shape?.left),
              parseInt(shape?.bottom),
              parseInt(shape?.right)
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
};

export default Board;

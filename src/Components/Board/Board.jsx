import React, { useState } from "react";
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

  const [visibleTooltip, setVisibleTooltip] = useState(-1);

  const round = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <div style={styles.shapesBoxContainer}>
      <div style={styles.shapesBox(width, height)}>
        {shapes?.map((shape, index) => (
          <>
            <div
              onMouseEnter={() => {
                setHoveredShape(index);
                setVisibleTooltip(index);
              }}
              onMouseLeave={() => {
                setHoveredShape(-1);
                setVisibleTooltip(-1);
              }}
              style={styles.shape(
                parseInt(shape?.width),
                parseInt(shape?.height),
                parseInt(shape?.top),
                parseInt(shape?.left),
                hoveredShape === index && isHoverEnabled
              )}
            >
              <div style={styles.tooltipContainer}>
                <div
                  style={styles.tooltip(
                    visibleTooltip === index && isHoverEnabled
                  )}
                >
                  <p style={styles.tooltipText}>{`Top: ${round(
                    shape.top
                  )} / Left: ${round(shape.left)}`}</p>
                  <p style={styles.tooltipText}>{`Width: ${round(
                    shape.width
                  )} / Height: ${round(shape.height)}`}</p>
                </div>
              </div>
              {shape.name}
            </div>
          </>
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

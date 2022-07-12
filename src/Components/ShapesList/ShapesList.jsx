import React from "react";
import { styles } from "./styles.ts";
import PropTypes from "prop-types";

/**
 * list: [{ name: string, top: number, left: number }]
 */
const ShapesList = (props) => {
  const { list } = props;

  const round = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const getRow = (shape) => (
    <div style={styles.listItem}>
      <h5>{shape.name}</h5>
      <div style={styles.listItemInfo}>
        <p>{`Top: ${round(shape.top)} / Left: ${round(shape.left)}`}</p>
        <p>{`Width: ${round(shape.width)} / Height: ${round(shape.height)}`}</p>
      </div>
    </div>
  );

  return (
    <div style={styles.listContainer}>
      <h4 style={styles.listHeader}>Shapes</h4>
      <div>{list?.map((shape) => getRow(shape))}</div>
    </div>
  );
};

ShapesList.propTypes = {
  list: PropTypes.array,
};

export default ShapesList;

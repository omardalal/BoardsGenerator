const MAX_TRIES = 10000;
const MAX_RETRIES = 10;
const MIN_EDGE_DISTANCE = 1;

/**
 * shapes: [{name, width, height}]
 */
export const generateShapes = (boardWidth, boardHeight, shapes) => {
  let retries = 0;
  let boards = generateBoard(boardWidth, boardHeight, shapes);

  while (boards?.length < 1 && retries < MAX_RETRIES) {
    boards = generateBoard(boardWidth, boardHeight, shapes);
    retries++;
  }

  return boards;
};

const generateBoard = (boardWidth, boardHeight, shapes) => {
  const shapesList = [];

  let success = true;
  const shapesArray = shapes.map((shape) => {
    if (!success) {
      return {};
    }
    let left = 0;
    let top = 0;

    const shapeWidth = parseInt(shape.width);
    const shapeHeight = parseInt(shape.height);

    //Check if drawn shape overlaps with a previously drawn one. If true, try again (max tries: 100)
    let overlaps = false;
    let tries = 0;
    do {
      overlaps = false;

      left = Math.max(
        Math.random() * (boardWidth - MIN_EDGE_DISTANCE - shapeWidth),
        MIN_EDGE_DISTANCE
      );
      top = Math.max(
        Math.random() * (boardHeight - MIN_EDGE_DISTANCE - shapeHeight),
        MIN_EDGE_DISTANCE
      );

      for (let i = 0; i < shapesList.length; i++) {
        if (
          elementsOverlap(shapesList[i], {
            top: top,
            left: left,
            right: left + shapeWidth,
            bottom: top + shapeHeight,
          })
        ) {
          overlaps = true;
          break;
        }
      }
      tries++;
    } while (overlaps && tries < MAX_TRIES);

    if (tries >= MAX_TRIES) {
      success = false;
    }

    shapesList.push({
      ...shape,
      top: top,
      left: left,
      right: left + shapeWidth,
      bottom: top + shapeHeight,
    });

    return {
      ...shape,
      top: top,
      left: left,
      right: left + shapeWidth,
      bottom: top + shapeHeight,
    };
  });

  if (!success) {
    return [];
  }

  return shapesArray;
};

const elementsOverlap = (el1, el2) => {
  return !(
    el1.top > el2.bottom ||
    el1.right < el2.left ||
    el1.bottom < el2.top ||
    el1.left > el2.right
  );
};

export const round = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

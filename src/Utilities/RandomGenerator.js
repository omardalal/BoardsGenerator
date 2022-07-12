/**
 * shapes: [{name, width, height}]
 */
export const generateShapes = (boardWidth, boardHeight, shapes) => {
  const shapesList = [];
  const shapesArray = shapes.map((shape) => {
    let left = 0;
    let top = 0;

    //Check if drawn shape overlaps with a previously drawn one. If true, try again (max tries: 100)
    let overlaps = false;
    do {
      overlaps = false;

      left = Math.random() * (boardWidth - shape.width);
      top = Math.random() * (boardHeight - shape.height);

      for (let i = 0; i < shapesList.length; i++) {
        if (
          elementsOverlap(shapesList[i], {
            top,
            left,
            right: left + shape.width,
            bottom: top + shape.height,
          })
        ) {
          overlaps = true;
          break;
        }
      }
    } while (overlaps);

    shapesList.push({
      ...shape,
      top,
      left,
      right: left + shape.width,
      bottom: top + shape.height,
    });

    return {
      ...shape,
      top,
      left,
      right: boardWidth - (left + shape.width),
      bottom: boardHeight - (top + shape.height),
    };
  });
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

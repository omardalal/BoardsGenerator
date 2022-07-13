/**
 * shapes: [{name, width, height}]
 */
export const generateShapes = (boardWidth, boardHeight, shapes) => {
  const shapesList = [];
  const shapesArray = shapes.map((shape) => {
    let left = 0;
    let top = 0;

    const shapeWidth = parseInt(shape.width);
    const shapeHeight = parseInt(shape.height);

    //Check if drawn shape overlaps with a previously drawn one. If true, try again (max tries: 100)
    let overlaps = false;
    do {
      overlaps = false;

      left = Math.random() * (boardWidth - shapeWidth);
      top = Math.random() * (boardHeight - shapeHeight);

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
    } while (overlaps);

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

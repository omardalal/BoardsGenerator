import { round } from "../../Utilities/RandomGenerator";
import {
  ConnectorConstraints,
  NodeConstraints,
} from "@syncfusion/ej2-react-diagrams";
import { gray20 } from "@carbon/colors";

export const createNode = (
  id,
  displayName,
  width,
  height,
  x,
  y,
  powerDensity
) => ({
  id: id,
  width: width,
  height: height,
  offsetX: x,
  offsetY: y,
  style: {
    fill: gray20,
    fontSize: 14,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
  shape: { type: "Text", content: displayName },
  constraints:
    NodeConstraints.Default -
    NodeConstraints.Resize -
    NodeConstraints.HideThumbs -
    NodeConstraints.Rotate -
    NodeConstraints.Delete,
  borderWidth: getSpacing(powerDensity) * 2,
  borderColor: "rgba(255 0 0 / 0.5)",
  pivot: { x: 0, y: 0 },
});

export const createStraightConnector = (
  id,
  sourcePoint, // {x,y}
  targetPoint // {x,y}
) => ({
  ...straightConnector,
  ...{
    id,
    sourcePoint: { x: sourcePoint.x, y: sourcePoint.y },
    targetPoint: { x: targetPoint.x, y: targetPoint.y },
  },
});

export const createOrthogonalConnector = (
  id,
  sourcePoint, // {x,y}
  targetPoint // {x,y}
) => ({
  ...orthogonalConnector,
  ...{
    id,
    sourcePoint: { x: sourcePoint.x, y: sourcePoint.y },
    targetPoint: { x: targetPoint.x, y: targetPoint.y },
  },
});

export const parseShapesList = (shapes) => {
  if (shapes?.length < 1) {
    return [];
  }
  return shapes?.map((shape, index) =>
    createNode(
      `${shape.name}_${index}`,
      shape.name,
      parseInt(shape.width),
      parseInt(shape.height),
      parseInt(shape.left),
      parseInt(shape.top),
      parseInt(shape.powerDensity)
    )
  );
};

export const parseConnectorsList = (connectors) => {
  if (!connectors || connectors?.length < 1) {
    return [];
  }
  return connectors?.map((connector, index) => {
    if (connector.type === "Straight") {
      return createStraightConnector(
        connector.id,
        connector.sourcePoint,
        connector.targetPoint
      );
    }
    return createOrthogonalConnector(
      connector.id,
      connector.sourcePoint,
      connector.targetPoint
    );
  });
};

export const pageSettings = {
  width: 750,
  height: 750,
  boundaryConstraints: "Page",
  multiplePage: false,
  constraints: ConnectorConstraints.Default | ConnectorConstraints.Interaction,
};

export const scrollSettings = {
  minZoom: 1,
  maxZoom: 1,
};

export const straightConnector = {
  id: "straightLine_",
  type: "Straight",
  segments: [
    {
      type: "polyline",
    },
  ],
  style: {
    strokeColor: "#6BA5D7",
    fill: "#6BA5D7",
    strokeWidth: 2,
  },
  targetDecorator: {
    style: {
      fill: "#6BA5D7",
      strokeColor: "#6BA5D7",
    },
    shape: "None",
  },
};

export const orthogonalConnector = {
  id: "orthoLine_",
  style: {
    strokeColor: "#6BA5D7",
    fill: "#6BA5D7",
    strokeWidth: 2,
  },
  targetDecorator: {
    style: {
      fill: "#6BA5D7",
      strokeColor: "#6BA5D7",
    },
    shape: "None",
  },
  type: "Orthogonal",
};

export const getSpacing = (powerDensity) => {
  if (powerDensity < 100) return 20;
  if (powerDensity < 200) return 30;
  if (powerDensity < 300) return 40;
  if (powerDensity < 350) return 50;
  if (powerDensity < 400) return 60;
  if (powerDensity < 600) return 70;
  return 80;
};

export const calculateStraightLineLength = (connector) => {
  const sourcePoint = connector?.sourcePoint;
  const targetPoint = connector?.targetPoint;
  if (!sourcePoint || !targetPoint) {
    return;
  }
  let a = sourcePoint.x - targetPoint.x;
  let b = sourcePoint.y - targetPoint.y;
  return round(Math.sqrt(a * a + b * b));
};

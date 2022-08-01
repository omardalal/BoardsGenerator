import React, { useState, useRef, useEffect } from "react";
import {
  Connector,
  Node,
  DiagramComponent,
  DiagramTools,
  Selector,
} from "@syncfusion/ej2-react-diagrams";
import { styles } from "./styles.ts";
import {
  calculateStraightLineLength,
  pageSettings,
  orthogonalConnector,
  straightConnector,
  scrollSettings,
  parseShapesList,
  parseConnectorsList,
} from "./InteractiveBoardModel";
import {
  Pen,
  WarningFilled as Warning,
  Draw,
  DirectionStraight,
} from "@carbon/react/icons";
import useClickOutside from "../../CustomHooks/useClickOutside";
import PropTypes from "prop-types";

const UHDI_MAX_LENGTH = 200;

// Connector -> id, sourcePoint{x,y}, targetPoint{x,y}, type = "Orthogonal" || "Straight"
const InteractiveBoard = ({
  connectorsCopy,
  setConnectorsCopy,
  shapesCopy,
  setShapesCopy,
  setChangesMade,
  height,
  width,
}) => {
  const [selectedDrawConnector, setSelectedDrawConnector] =
    useState(straightConnector);
  const [inDrawMode, setInDrawMode] = useState(false);
  const [nodesList, setNodesList] = useState(parseShapesList(shapesCopy));
  const [drawnConnectors, setDrawnConnectors] = useState(
    parseConnectorsList(connectorsCopy)
  );
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [penHovered, setPenHovered] = useState(false);
  const [warningHovered, setWarningHovered] = useState(false);
  const [straightHovered, setStraightHovered] = useState(false);
  const [penSelectShown, setPenSelectShown] = useState(false);
  const [orthoHovered, setOrthoHovered] = useState(false);
  const boardRef = useRef();
  const penMenuRef = useRef();
  const [boardRefreshKey, setBoardRefreshKey] = useState(0);
  useClickOutside(penMenuRef, undefined, () => setPenSelectShown(false));

  useEffect(() => {
    setNodesList(parseShapesList(shapesCopy));
  }, [shapesCopy]);

  useEffect(() => {
    const connectors = parseConnectorsList(connectorsCopy);
    setDrawnConnectors(connectors);
    updateConnectorsAnnotations(connectors);
    setBoardRefreshKey((prvKey) => prvKey + 1);
  }, [connectorsCopy]);

  const onPositionChange = (val) => {
    if (val.state === "Completed") {
      setChangesMade(true);
      if (val.source instanceof Connector) {
        updateConnectorsPos(
          val.source?.id,
          val.source?.sourcePoint,
          val.source?.targetPoint
        );
        return;
      }

      if (val.source instanceof Selector) {
        if (val.source?.nodes?.length > 0) {
          updateShapesPos(val.source?.nodes?.[0]?.id, val);
        }
        if (val.source?.connectors?.length > 0) {
          updateConnectorsPos(
            val.source?.connectors?.[0]?.id,
            val.source?.connectors?.[0].sourcePoint,
            val.source?.connectors?.[0].targetPoint
          );
        }
        return;
      }

      if (val.source instanceof Node) {
        updateShapesPos(val.source?.id, val);
        return;
      }
    }
  };

  const updateConnectorsPos = (id, sourcePoint, targetPoint) => {
    let connectorIndex = -1;
    setDrawnConnectors(
      drawnConnectors.map((conn, index) => {
        if (conn.id === id) {
          connectorIndex = index;
          return {
            ...conn,
            sourcePoint: {
              x: sourcePoint.x,
              y: sourcePoint.y,
            },
            targetPoint: {
              x: targetPoint.x,
              y: targetPoint.y,
            },
          };
        }
        return conn;
      })
    );

    if (connectorIndex >= 0) {
      setConnectorsCopy(
        connectorsCopy?.map((connector, index) => {
          if (index !== connectorIndex) {
            return connector;
          }
          return {
            ...connector,
            sourcePoint: {
              x: sourcePoint.x,
              y: sourcePoint.y,
            },
            targetPoint: {
              x: targetPoint.x,
              y: targetPoint.y,
            },
          };
        })
      );
    }
  };

  const updateShapesPos = (id, val) => {
    let nodeIndex = -1;
    setNodesList(
      nodesList.map((node, index) => {
        if (node.id === id) {
          nodeIndex = index;
          return {
            ...node,
            offsetX: val.source?.offsetX,
            offsetY: val.source?.offsetY,
          };
        }
        return node;
      })
    );

    if (nodeIndex >= 0) {
      setShapesCopy(
        shapesCopy.map((node, index) => {
          if (index === nodeIndex) {
            return {
              ...node,
              left: val.source?.offsetX,
              top: val.source?.offsetY,
              bottom: val.source?.offsetY + val.source?.height,
              right: val.source?.offsetX + val.source?.width,
            };
          }
          return node;
        })
      );
    }
  };

  const updateConnectorsAnnotations = (connectors) => {
    if (!connectors) {
      return;
    }
    setDrawnConnectors(
      connectors?.map((connector) => {
        if (connector?.id?.startsWith("orth")) {
          return connector;
        }
        const length = calculateStraightLineLength(connector);
        return {
          ...connector,
          annotations: [
            {
              content: `${length}`,
              style: {
                color: length > UHDI_MAX_LENGTH ? "red" : "black",
                bold: true,
                fontSize: 14,
                fill: "rgba(255 255 255 / 0.85)",
              },
            },
          ],
        };
      })
    );
  };

  const onPropertyChange = (val) => {
    if (
      !(
        !val.element.connectors ||
        val.element.connectors?.length === drawnConnectors?.length
      )
    ) {
      updateConnectorsAnnotations(val.element?.connectors);
      setConnectorsCopy(
        val.element?.connectors?.map((connector) => ({
          id: connector.properties?.id,
          sourcePoint: {
            x: connector.properties?.sourcePoint?.x,
            y: connector.properties?.sourcePoint?.y,
          },
          targetPoint: {
            x: connector.properties?.targetPoint?.x,
            y: connector.properties?.targetPoint?.y,
          },
          type: connector.properties?.type,
        }))
      );
      setChangesMade(true);
    }
  };

  const getSideBtns = () => (
    <div style={styles.btnsColumn} className={"defaultBoxShadowBlack"}>
      <div style={styles.penSelectContainer}>
        <div
          style={styles.penSelectMenu(penSelectShown)}
          className={"defaultBoxShadowBlack"}
          ref={penMenuRef}
        >
          <Draw
            width={22}
            height={22}
            onClick={() => {
              setInDrawMode(true);
              setSelectedDrawConnector(orthogonalConnector);
              setPenSelectShown(false);
            }}
            color={"#fff"}
            style={styles.penSelectBtn(orthoHovered)}
            onMouseEnter={() => setOrthoHovered(true)}
            onMouseLeave={() => setOrthoHovered(false)}
          />
          <DirectionStraight
            width={22}
            height={22}
            onClick={() => {
              setInDrawMode(true);
              setSelectedDrawConnector(straightConnector);
              setPenSelectShown(false);
            }}
            color={"#fff"}
            style={styles.penSelectBtn(straightHovered)}
            onMouseEnter={() => setStraightHovered(true)}
            onMouseLeave={() => setStraightHovered(false)}
          />
        </div>
        <Pen
          width={24}
          height={24}
          onClick={() => {
            if (inDrawMode) {
              setInDrawMode(false);
              setPenSelectShown(false);
              return;
            }
            setPenSelectShown(true);
          }}
          color={inDrawMode ? "lightblue" : "#fff"}
          style={styles.sideBtn(penHovered)}
          onMouseEnter={() => setPenHovered(true)}
          onMouseLeave={() => setPenHovered(false)}
        />
      </div>
      <Warning
        width={22}
        height={22}
        onClick={() => {
          setShowDangerZone((prev) => !prev);
        }}
        color={showDangerZone ? "tomato" : "#fff"}
        style={styles.sideBtn(warningHovered)}
        onMouseEnter={() => setWarningHovered(true)}
        onMouseLeave={() => setWarningHovered(false)}
      />
    </div>
  );

  const onConnectorPointChange = (val) => {
    if (val.state === "Completed") {
      setChangesMade(true);
      updateConnectorsPos(
        val.connector?.id,
        val.connector?.sourcePoint,
        val.connector?.targetPoint
      );
    }
  };

  return (
    <div style={{ margin: "auto", display: "flex" }}>
      {getSideBtns()}
      <div style={styles.boardContainer}>
        <DiagramComponent
          key={boardRefreshKey}
          style={styles.board}
          id="diagram"
          ref={boardRef}
          width={height}
          height={width}
          nodes={nodesList.map((node) => ({
            ...node,
            borderColor: showDangerZone ? "rgba(255 0 0 / 0.5)" : "transparent",
          }))}
          connectors={drawnConnectors}
          pageSettings={(() => pageSettings(width, height))()}
          scrollSettings={scrollSettings}
          sourcePointChange={onConnectorPointChange}
          targetPointChange={onConnectorPointChange}
          drawingObject={selectedDrawConnector}
          tool={inDrawMode ? DiagramTools.ContinuousDraw : DiagramTools.Default}
          positionChange={onPositionChange}
          propertyChange={onPropertyChange}
        />
      </div>
    </div>
  );
};

export default InteractiveBoard;

InteractiveBoard.propTypes = {
  connectorsCopy: PropTypes.array,
  shapesCopy: PropTypes.array,
  setShapesCopy: PropTypes.func,
  setChangesMade: PropTypes.func,
  setConnectorsCopy: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};

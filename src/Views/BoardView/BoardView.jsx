import React, { useState, useEffect } from "react";
import { styles } from "./styles.ts";
import Board from "../../Components/Board/Board";
import ShapesList from "../../Components/ShapesList/ShapesList";
import { Button, Checkbox, Dropdown, Loading } from "@carbon/react";
import PropTypes from "prop-types";
import {
  saveNewBoardToCloud,
  updateBoardValues,
} from "../../Utilities/StorageUtils";
import useAuth from "../../CustomHooks/useAuth";
import {
  CellDirective,
  CellsDirective,
  RowDirective,
  RowsDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
} from "@syncfusion/ej2-react-spreadsheet";
import { round } from "../../Utilities/RandomGenerator";
import InteractiveBoard from "../../Components/InteractiveBoard/InteractiveBoard";

const BoardView = (props) => {
  const { boardData, backOnPress, saved } = props;

  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedResult, setSelectedResult] = useState(0);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [hoveredShape, setHoveredShape] = useState(-1);
  const [isHoverEnabled, setHoverEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpreadsheetView, setIsSpreadsheetView] = useState(false);
  const [inInteractiveView, setInInteractiveView] = useState(false);
  const [shapesCopy, setShapesCopy] = useState(
    boardData?.generatedBoards[selectedResult]
  );
  const [connectorsCopy, setConnectorsCopy] = useState(
    boardData?.drawnConnectors?.[selectedResult] ?? []
  );
  const [changesMade, setChangesMade] = useState(false);

  const loggedUser = useAuth();

  useEffect(() => {
    setShapesCopy(boardData?.generatedBoards[selectedResult]);
    setConnectorsCopy(boardData?.drawnConnectors?.[selectedResult] ?? []);
    setChangesMade(false);
  }, [boardData?.generatedBoards, boardData?.drawnConnectors, selectedResult]);

  const getDropDownArr = () => {
    const arr = [];
    for (let i = 1; i <= boardData.resultsCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  if (isSpreadsheetView) {
    return (
      <div style={styles.spreadSheetViewContainer}>
        <div style={styles.spreadSheetTitleContainer}>
          <Button
            className={"defaultBoxShadowBlack"}
            style={styles.btn}
            onClick={() => setIsSpreadsheetView(false)}
          >
            Back
          </Button>
          <h3 style={styles.spreadSheetTitle}>{`Result ${
            selectedResult + 1
          } Spreadsheet`}</h3>
        </div>
        <div
          style={styles.spreadsheetContainer}
          className={"defaultBoxShadowBlack"}
        >
          <SpreadsheetComponent
            allowOpen={false}
            allowSave={true}
            saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
          >
            <SheetsDirective>
              <SheetDirective>
                <RowsDirective>
                  <RowDirective>
                    <CellsDirective>
                      <CellDirective value={"Name"} />
                      <CellDirective value={"Top"} />
                      <CellDirective value={"Left"} />
                      <CellDirective value={"Width"} />
                      <CellDirective value={"Height"} />
                      <CellDirective value={"Power Density"} />
                    </CellsDirective>
                  </RowDirective>
                  {shapesCopy?.map((shape) => (
                    <RowDirective>
                      <CellsDirective>
                        <CellDirective value={shape.name} />
                        <CellDirective value={round(shape.top)} />
                        <CellDirective value={round(shape.left)} />
                        <CellDirective value={round(shape.width)} />
                        <CellDirective value={round(shape.height)} />
                        <CellDirective
                          value={round(shape?.powerDensity ?? "")}
                        />
                      </CellsDirective>
                    </RowDirective>
                  ))}
                </RowsDirective>
              </SheetDirective>
            </SheetsDirective>
          </SpreadsheetComponent>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      {isLoading && <Loading />}
      <div style={{ ...styles.btnsContainer, marginBottom: 15 }}>
        <Button
          className={"defaultBoxShadowBlack"}
          style={styles.btn}
          onClick={() => backOnPress?.()}
        >
          Back
        </Button>
        <Button
          className={"defaultBoxShadowBlack"}
          style={styles.btn}
          onClick={() => {
            setShapesCopy(boardData?.generatedBoards[selectedResult]);
            setConnectorsCopy(boardData?.drawnConnectors?.[selectedResult]);
            setChangesMade(false);
          }}
          kind={"danger"}
          disabled={!changesMade}
        >
          Discard Changes
        </Button>
      </div>
      <div style={styles.titleRow}>
        <h3>{boardData.boardTitle}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: 15 }}>Result</p>
          <Dropdown
            items={getDropDownArr()}
            itemToString={(item) => item || ""}
            onChange={(item) => {
              setSelectedResult(parseInt(item.selectedItem) - 1);
            }}
            initialSelectedItem={selectedResult + 1}
            light
            style={{ minWidth: 100 }}
          />
        </div>
        <p>{boardData.date}</p>
      </div>
      {!inInteractiveView && (
        <Checkbox
          defaultChecked
          labelText={"Hover Enabled"}
          id="checkbox-label-1"
          onChange={(_, { checked }) => setHoverEnabled(checked)}
        />
      )}
      <h5 style={styles.errorLbl(isSuccess)}>{errorMsg}</h5>
      <div style={styles.boardRow}>
        {!inInteractiveView ? (
          <Board
            width={parseInt(boardData?.boardWidth)}
            height={parseInt(boardData?.boardHeight)}
            shapes={shapesCopy}
            hoveredShape={hoveredShape}
            setHoveredShape={setHoveredShape}
            isHoverEnabled={isHoverEnabled}
          />
        ) : (
          <InteractiveBoard
            shapesCopy={shapesCopy}
            setShapesCopy={setShapesCopy}
            setChangesMade={setChangesMade}
            connectorsCopy={connectorsCopy}
            setConnectorsCopy={setConnectorsCopy}
            width={parseInt(boardData?.boardWidth)}
            height={parseInt(boardData?.boardHeight)}
          />
        )}
        <ShapesList
          list={shapesCopy}
          hoveredShape={hoveredShape}
          setHoveredShape={setHoveredShape}
          isHoverEnabled={isHoverEnabled}
        />
      </div>
      <div style={styles.btnsContainer}>
        <div style={styles.btnsLeft}>
          <Button
            className={"defaultBoxShadowBlack"}
            style={styles.btn}
            onClick={() => setInInteractiveView((prev) => !prev)}
          >
            {inInteractiveView ? "Static View" : "Interactive View"}
          </Button>
        </div>
        <div style={{ marginRight: 10 }} />
        <div style={styles.btnsRight}>
          <Button
            className={"defaultBoxShadowBlack"}
            style={styles.btn}
            onClick={() => {
              setIsSpreadsheetView(true);
            }}
          >
            View Spreadsheet
          </Button>
          <div style={{ marginRight: 10 }} />
          <Button
            className={"defaultBoxShadowBlack"}
            style={styles.btn}
            disabled={(saved || savedSuccessfully) && !changesMade}
            onClick={async () => {
              if (!loggedUser.isSignedIn) {
                setIsSuccess(false);
                setErrorMsg("You must be logged in to use this feature!");
                return;
              }
              setIsLoading(true);
              try {
                const generatedBoards = boardData?.generatedBoards?.map(
                  (res, index) => {
                    if (index === selectedResult) {
                      return shapesCopy;
                    }
                    return res;
                  }
                );
                const connectors = boardData?.drawnConnectors?.map(
                  (res, index) => {
                    if (index === selectedResult) {
                      return connectorsCopy;
                    }
                    return res;
                  }
                );
                if (saved && boardData.boardId) {
                  updateBoardValues(
                    boardData.boardId,
                    generatedBoards,
                    connectors
                  );
                } else {
                  await saveNewBoardToCloud(
                    loggedUser?.user?.email,
                    boardData,
                    generatedBoards,
                    connectors
                  );
                }
                setIsSuccess(true);
                setErrorMsg("Saved successfully!");
                setSavedSuccessfully(true);
                setChangesMade(false);
              } catch (error) {
                setIsSuccess(false);
                setErrorMsg("Failed to save board!");
                console.error("Failed to store board, Error: " + error);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Save to Cloud
          </Button>
        </div>
      </div>
    </div>
  );
};

BoardView.propTypes = {
  boardData: PropTypes.object,
  backOnPress: PropTypes.func,
  saved: PropTypes.bool,
};

export default BoardView;

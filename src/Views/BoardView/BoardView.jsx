import React, { useState } from "react";
import { styles } from "./styles.ts";
import Board from "../../Components/Board/Board";
import ShapesList from "../../Components/ShapesList/ShapesList";
import { Button, Checkbox, Dropdown } from "@carbon/react";
import PropTypes from "prop-types";
import { saveBoardToCloud } from "../../Utilities/StorageUtils";
import useAuth from "../../CustomHooks/useAuth";

const BoardView = (props) => {
  const { boardData, backOnPress, saved } = props;

  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedResult, setSelectedResult] = useState(0);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [hoveredShape, setHoveredShape] = useState(-1);
  const [isHoverEnabled, setHoverEnabled] = useState(true);

  const loggedUser = useAuth();

  const getDropDownArr = () => {
    const arr = [];
    for (let i = 1; i <= boardData.resultsCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div style={styles.mainContainer}>
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
            initialSelectedItem={1}
            light
            style={{ minWidth: 100 }}
          />
        </div>
        <p>{boardData.date}</p>
      </div>
      <Checkbox
        defaultChecked
        labelText={"Hover Enabled"}
        id="checkbox-label-1"
        onChange={(_, { checked }) => setHoverEnabled(checked)}
      />
      <h5 style={styles.errorLbl(isSuccess)}>{errorMsg}</h5>
      <div style={styles.boardRow}>
        <Board
          width={parseInt(boardData?.boardWidth)}
          height={parseInt(boardData?.boardHeight)}
          shapes={boardData?.generatedBoards[selectedResult]}
          hoveredShape={hoveredShape}
          setHoveredShape={setHoveredShape}
          isHoverEnabled={isHoverEnabled}
        />
        <ShapesList
          list={boardData?.generatedBoards[selectedResult]}
          hoveredShape={hoveredShape}
          setHoveredShape={setHoveredShape}
          isHoverEnabled={isHoverEnabled}
        />
      </div>
      <div style={styles.btnsContainer}>
        <Button
          className={"defaultBoxShadowBlack"}
          style={styles.btn}
          onClick={() => backOnPress?.()}
        >
          Back
        </Button>
        <div style={{ marginRight: 10 }} />
        <Button
          className={"defaultBoxShadowBlack"}
          style={styles.btn}
          disabled={saved || savedSuccessfully}
          onClick={async () => {
            if (!loggedUser.isSignedIn) {
              setIsSuccess(false);
              setErrorMsg("You must be logged in to use this feature!");
            }
            try {
              await saveBoardToCloud(loggedUser?.user?.email, boardData);
              setIsSuccess(true);
              setErrorMsg("Saved successfully!");
              setSavedSuccessfully(true);
            } catch (error) {
              setIsSuccess(false);
              setErrorMsg("Failed to save board!");
              console.error("Failed to store board, Error: " + error);
            }
          }}
        >
          Save to Cloud
        </Button>
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

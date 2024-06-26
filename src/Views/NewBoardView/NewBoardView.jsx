import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import { NumberInput, TextInput, Button } from "@carbon/react";
import BoardView from "../BoardView/BoardView";
import { generateShapes } from "../../Utilities/RandomGenerator";
import { Erase } from "@carbon/react/icons";

const MAX_SHAPES = 25;
const MAX_RESULTS = 300;

const NewBoardView = () => {
  const initialFormData = {
    boardTitle: "",
    shapesCount: 1,
    resultsCount: 50,
    boardWidth: 1,
    boardHeight: 1,
    shapes: [],
    date: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [inBoardView, setInBoardView] = useState(false);
  const [eraseBtnOpacity, setEraseBtnOpacity] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setShowError(false);
  }, [inBoardView]);

  useEffect(() => {
    if (formData?.shapesCount > formData?.shapes?.length) {
      const limit =
        formData?.shapesCount <= MAX_SHAPES
          ? formData?.shapesCount
          : MAX_SHAPES;
      for (let i = formData?.shapes?.length; i < limit; i++) {
        formData?.shapes?.push({
          name: `Die ${i + 1}`,
          width: 1,
          height: 1,
          powerDensity: 0,
        });
      }
      return;
    }

    if (formData?.shapesCount < formData?.shapes?.length) {
      for (let i = formData?.shapes?.length; i > formData?.shapesCount; i--) {
        formData?.shapes?.pop();
      }
      return;
    }
  }, [formData.shapes, formData.shapesCount]);

  const validateInputs = () => {
    if (
      !formData.boardTitle ||
      !formData.boardWidth ||
      !formData.boardHeight ||
      !formData.resultsCount ||
      !formData.shapesCount ||
      !formData.shapes?.length >= 1
    ) {
      setShowError(true);
      return;
    }

    let generatedBoards = [];
    for (let i = 0; i < formData.resultsCount; i++) {
      const board = generateShapes(
        parseInt(formData.boardWidth),
        parseInt(formData.boardHeight),
        formData.shapes
      );
      if (board.length < 1) {
        generatedBoards = [];
        break;
      }
      generatedBoards.push(board);
    }

    if (generatedBoards.length < 1) {
      setErrorMsg(
        "Failed to generate board, please make sure that the dimensions you entered make sense."
      );
      return;
    }

    setErrorMsg("");

    setFormData({
      ...formData,
      date: new Date().toLocaleString(),
      generatedBoards,
    });
    setInBoardView(true);
  };

  const getShapeInputs = () => {
    const rows = [];
    const limit =
      formData?.shapesCount <= MAX_SHAPES ? formData?.shapesCount : MAX_SHAPES;
    for (let i = 0; i < limit; i++) {
      rows.push(
        <div style={styles.fieldsRow}>
          <TextInput
            invalid={showError && !formData.shapes[i]?.name}
            value={formData.shapes[i]?.name ?? `Die ${i + 1}`}
            invalidText={"This field is required!"}
            data-modal-primary-focus
            labelText={"Die name"}
            placeholder={"Name"}
            onChange={(evt) => {
              const newShapes = formData.shapes;
              newShapes[i] = { ...newShapes[i], name: evt.target?.value };
              setFormData({ ...formData, shapes: newShapes });
            }}
            light
            style={styles.titleInput}
          />
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              max={parseFloat(formData?.boardWidth)}
              invalid={showError && !formData.shapes[i]?.width}
              invalidText={
                formData?.shapes[i]?.width > formData?.boardWidth
                  ? "Die width should be less than package width"
                  : "This field is required!"
              }
              label={"Die width"}
              placeholder={"Width"}
              value={formData.shapes[i]?.width ?? 1}
              onChange={(evt) => {
                const newShapes = formData.shapes;
                newShapes[i] = { ...newShapes[i], width: evt.target?.value };
                setFormData({ ...formData, shapes: newShapes });
              }}
              light
            />
          </div>
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              max={parseFloat(formData?.boardHeight)}
              invalid={showError && !formData.shapes[i]?.height}
              invalidText={
                formData?.shapes[i]?.height > formData?.boardHeight
                  ? "Die height should be less than package height"
                  : "This field is required!"
              }
              label={"Die height"}
              placeholder={"Height"}
              value={formData.shapes[i]?.height ?? 1}
              onChange={(evt) => {
                const newShapes = formData.shapes;
                newShapes[i] = { ...newShapes[i], height: evt.target?.value };
                setFormData({ ...formData, shapes: newShapes });
              }}
              light
            />
          </div>
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              invalid={showError && !formData.shapes[i]?.powerDensity}
              invalidText={"This field is required!"}
              label={"Power Density"}
              placeholder={"Power"}
              value={formData.shapes[i]?.powerDensity ?? 1}
              onChange={(evt) => {
                const newShapes = formData.shapes;
                newShapes[i] = {
                  ...newShapes[i],
                  powerDensity: evt.target?.value,
                };
                setFormData({ ...formData, shapes: newShapes });
              }}
              light
            />
          </div>
        </div>
      );
    }
    return rows;
  };

  if (inBoardView) {
    return (
      <BoardView
        backOnPress={() => setInBoardView(false)}
        boardData={formData}
      />
    );
  }

  return (
    <div style={styles.inputBox} className={"defaultBoxShadowBlack"}>
      <div style={styles.formContainer}>
        <h5 style={styles.errorLbl}>{errorMsg}</h5>
        <div style={styles.titleRow}>
          <h3 style={styles.formTitle}>New Package</h3>
          <Erase
            style={styles.eraseIcon(eraseBtnOpacity)}
            onClick={() => {
              setShowError(false);
              setFormData(initialFormData);
              setErrorMsg("");
            }}
            onMouseEnter={() => setEraseBtnOpacity(0.75)}
            onMouseLeave={() => setEraseBtnOpacity(1)}
          />
        </div>
        <h5 style={styles.sectionTitle}>Package Information</h5>
        <div style={styles.fieldsRow}>
          <TextInput
            invalid={showError && !formData?.boardTitle}
            invalidText={"This field is required!"}
            value={formData?.boardTitle ?? ""}
            data-modal-primary-focus
            labelText={"Package Title"}
            placeholder={"Title"}
            onChange={(evt) => {
              setFormData({ ...formData, boardTitle: evt.target?.value });
            }}
            light
            style={styles.titleInput}
          />
        </div>
        <div style={styles.sepH} />
        <div
          style={{
            ...styles.fieldsRow,
            justifyContent: "space-between",
          }}
        >
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              min={1}
              max={MAX_RESULTS}
              invalid={showError && !formData?.resultsCount}
              invalidText={
                formData?.resultsCount > MAX_RESULTS ||
                formData?.resultsCount < 1
                  ? `Please enter a value between 1 and ${MAX_RESULTS}`
                  : "This field is required!"
              }
              label={"Results count"}
              placeholder={"number of generated packages"}
              value={formData?.resultsCount ?? 1}
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  resultsCount: evt.target?.value,
                });
              }}
              light
            />
          </div>
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              min={1}
              invalid={showError && !formData?.boardWidth}
              invalidText={
                formData?.boardWidth < 1
                  ? "Please enter a value larger than 0"
                  : "This field is required!"
              }
              label={"Package width"}
              placeholder={"Width"}
              value={formData?.boardWidth ?? 1}
              onChange={(evt) => {
                setFormData({
                  ...formData,
                  boardWidth: evt.target?.value,
                });
              }}
              light
            />
          </div>
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <div style={styles.numberInputContainer}>
              <NumberInput
                style={styles.numberInput}
                hideSteppers
                data-modal-primary-focus
                min={1}
                invalid={showError && !formData?.boardHeight}
                invalidText={
                  formData?.boardHeight < 1
                    ? "Please enter a value larger than 0"
                    : "This field is required!"
                }
                label={"Package height"}
                placeholder={"Height"}
                value={formData?.boardHeight ?? 1}
                onChange={(evt) => {
                  setFormData({
                    ...formData,
                    boardHeight: evt.target?.value,
                  });
                }}
                light
              />
            </div>
          </div>
          <div style={styles.sepH} />
          <div style={styles.numberInputContainer}>
            <NumberInput
              style={styles.numberInput}
              hideSteppers
              data-modal-primary-focus
              min={1}
              max={MAX_SHAPES}
              invalid={showError && !formData?.shapesCount}
              invalidText={
                formData?.shapesCount > MAX_SHAPES || formData?.shapesCount < 1
                  ? `Please enter a value between 1 and ${MAX_SHAPES}`
                  : "This field is required!"
              }
              label={"Number of dies"}
              placeholder={"Number of dies"}
              value={formData?.shapesCount ?? 1}
              onChange={(evt) => {
                if (!evt.target?.value) {
                  return;
                }
                setFormData({
                  ...formData,
                  shapesCount: evt.target?.value,
                });
              }}
              light
            />
          </div>
        </div>
        <h5 style={styles.sectionTitle}>Dies Information</h5>
        <div style={styles.shapeInputsContainer}>{getShapeInputs()}</div>
      </div>
      <Button
        style={styles.genBtn}
        onClick={() => {
          console.log(formData.shapes);
          validateInputs();
        }}
      >
        Generate
      </Button>
    </div>
  );
};

export default NewBoardView;

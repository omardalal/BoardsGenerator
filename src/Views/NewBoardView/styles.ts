import { CSSProperties } from "react";
import { red60 } from "@carbon/colors";

export const styles = {
  inputBox: {
    borderRadius: 10,
    margin: "auto",
    backgroundColor: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  formContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  genBtn: {
    marginLeft: "auto",
    marginTop: "auto",
  } as CSSProperties,
  sepV: { margin: "5px 0" } as CSSProperties,
  sepH: { margin: "0 5px" } as CSSProperties,
  formTitle: { marginBottom: 16 } as CSSProperties,
  titleInput: { minWidth: 300, flex: 2 } as CSSProperties,
  sectionTitle: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16.5,
  } as CSSProperties,
  fieldsRow: {
    display: "flex",
    marginBottom: 15,
    flexWrap: "wrap",
  } as CSSProperties,
  shapeInputsContainer: {
    display: "flex",
    flexDirection: "column",
    height: 400,
    overflow: "auto",
  } as CSSProperties,
  numberInput: { minWidth: 270 } as CSSProperties,
  numberInputContainer: { height: 80 } as CSSProperties,
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,
  eraseIcon: (opacity: number) =>
    ({
      width: 24,
      height: 24,
      cursor: "pointer",
      opacity: opacity,
    } as CSSProperties),
  errorLbl: {
    color: red60,
    fontWeight: 400,
    marginBottom: 10,
  } as CSSProperties,
};

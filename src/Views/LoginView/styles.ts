import { CSSProperties } from "react";
import { blue60, green60, red60 } from "@carbon/colors";

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
  sepV: { margin: "10px 0" } as CSSProperties,
  sepH: { margin: "0 5px" } as CSSProperties,
  formTitle: { marginBottom: 10 } as CSSProperties,
  titleInput: { minWidth: 300, flex: 2 } as CSSProperties,
  sectionTitle: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16.5,
  } as CSSProperties,
  fieldsCol: {
    display: "flex",
    marginBottom: 15,
    flexDirection: "column",
    minWidth: 300,
    maxWidth: 700,
    width: "50vw",
  } as CSSProperties,
  shapeInputsContainer: {
    display: "flex",
    flexDirection: "column",
    height: 400,
    overflow: "auto",
  } as CSSProperties,
  numberInput: { minWidth: 270 } as CSSProperties,
  numberInputContainer: { height: 80 } as CSSProperties,
  forgotPassword: {
    margin: "7px 0 0 0",
    border: "none",
    cursor: "pointer",
    fontWeight: 450,
    fontSize: 14,
    color: blue60,
  } as CSSProperties,
  errorLbl: (isSuccess: boolean) =>
    ({
      color: isSuccess ? green60 : red60,
      fontWeight: 400,
      marginBottom: 10,
    } as CSSProperties),
};

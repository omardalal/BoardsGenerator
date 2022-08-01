import { green60, red60 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    margin: "75px auto",
    padding: "0 20px",
  } as CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  } as CSSProperties,
  boardRow: {
    display: "flex",
    marginBottom: 15,
  } as CSSProperties,
  btnsContainer: {
    display: "flex",
    justifyContent: "space-between",
  } as CSSProperties,
  btn: {
    borderRadius: 7.5,
  },
  errorLbl: (isSuccess: boolean) =>
    ({
      color: isSuccess ? green60 : red60,
      fontWeight: 400,
      marginBottom: 10,
    } as CSSProperties),
  btnsRight: {
    display: "flex",
  } as CSSProperties,
  btnsLeft: {
    display: "flex",
  } as CSSProperties,
  spreadSheetViewContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "25px 40px",
  } as CSSProperties,
  spreadsheetContainer: {
    height: "100%",
    marginTop: 25,
  } as CSSProperties,
  spreadSheetTitleContainer: {
    display: "flex",
    alignItems: "center",
  } as CSSProperties,
  spreadSheetTitle: { marginLeft: 25 } as CSSProperties,
};

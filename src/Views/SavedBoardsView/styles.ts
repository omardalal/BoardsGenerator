import { gray10, gray10Hover } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  savesBox: {
    borderRadius: 10,
    margin: "200px auto",
    backgroundColor: "white",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  savesTable: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxHeight: 800,
    overflow: "auto",
    minWidth: 400,
    width: "70vw",
  } as CSSProperties,
  saveRow: (hovered: boolean) =>
    ({
      backgroundColor: hovered ? gray10Hover : gray10,
      padding: "10px 15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
      cursor: "pointer",
      transition: "0.3s",
    } as CSSProperties),
  title: { margin: 15 } as CSSProperties,
  infoMsg: { marginLeft: 15 } as CSSProperties,
};

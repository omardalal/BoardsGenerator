import { gray40, gray60 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  boardContainer: { minWidth: 500, minHeight: 500 } as CSSProperties,
  board: {
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
    position: "relative",
    marginRight: 15,
  } as CSSProperties,
  btnsColumn: {
    backgroundColor: gray60,
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: 100,
    marginRight: 5,
    borderRadius: 7.5,
    width: 40,
    alignItems: "center",
    justifyContent: "space-around",
  } as CSSProperties,
  sideBtn: (hovered: boolean) =>
    ({
      opacity: hovered ? 0.75 : 1,
      cursor: "pointer",
      transition: "0.3s",
    } as CSSProperties),
  penSelectContainer: { position: "relative" } as CSSProperties,
  penSelectMenu: (visible: boolean) =>
    ({
      position: "absolute",
      top: -15,
      backgroundColor: gray60,
      opacity: 0.9,
      color: "white",
      display: visible ? "flex" : "none",
      width: 100,
      marginRight: 5,
      borderRadius: 7.5,
      height: 40,
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 100,
      left: -35,
    } as CSSProperties),
  penSelectBtn: (hovered: boolean) =>
    ({
      backgroundColor: hovered ? "white" : "transparent",
      cursor: "pointer",
      transition: "0.3s",
      color: hovered ? gray60 : "white",
      flex: 1,
      height: "100%",
      padding: 5,
      borderRadius: 7.5,
    } as CSSProperties),
};

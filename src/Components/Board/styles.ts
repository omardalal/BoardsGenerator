import { gray20, gray30, cyan20 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  shapesBoxContainer: { minWidth: 500, minHeight: 500 } as CSSProperties,
  shapesBox: (width: number, height: number) =>
    ({
      border: "3px solid white",
      backgroundColor: "white",
      boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
      width: width,
      height: height,
      position: "relative",
      marginRight: 15,
    } as CSSProperties),
  shape: (
    width: number,
    height: number,
    top: number,
    left: number,
    hovered: boolean
  ) =>
    ({
      height: height,
      width: width,
      backgroundColor: hovered ? cyan20 : gray20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      border: `2px solid ${gray30}`,
      fontSize: 12,
      ...(hovered && { transform: "scale(1.25)", zIndex: 100 }),
      transition: "0.3s",
      top: top,
      left: left,
    } as CSSProperties),
  tooltip: (visible: boolean) =>
    ({
      display: visible ? "flex" : "none",
      flexDirection: "column",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: 150,
      height: 35,
      top: -40,
      backgroundColor: "rgba(0 0 0 / 0.75)",
      borderRadius: 10,
    } as CSSProperties),
  tooltipText: {
    fontSize: 10,
    color: "white",
  } as CSSProperties,
};

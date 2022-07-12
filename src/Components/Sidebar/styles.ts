import { gray10, gray100, gray100Hover, gray10Hover } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    backgroundColor: gray100,
    minHeight: "100%",
    width: 200,
    paddingTop: 25,
  } as CSSProperties,
  sidebarBtn: (hovered: boolean, selected: boolean) =>
    ({
      padding: "15px 15px",
      textAlign: "center",
      cursor: "pointer",
      transition: "0.3s",
      marginBottom: 10,
      ...(selected && { backgroundColor: hovered ? gray10Hover : gray10 }),
      ...(!selected && { backgroundColor: hovered ? gray100Hover : gray100 }),
      color: selected ? gray100 : gray10,
      fontSize: 15,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    } as CSSProperties),
  btnIconContainer: {
    marginRight: 5,
    padding: "0 10px",
  } as CSSProperties,
  btnIconStyle: (isAdd: boolean) =>
    ({ width: isAdd ? 22 : 18, height: isAdd ? 22 : 18 } as CSSProperties),
};

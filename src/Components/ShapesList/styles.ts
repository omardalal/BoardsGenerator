import { cyan50 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  listContainer: {
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)",
    backgroundColor: "white",
    borderRadius: "7.5px",
    width: 350,
    overflow: "auto",
    maxHeight: 760,
    cursor: "default",
  } as CSSProperties,
  listHeader: {
    textAlign: "center",
    padding: "10px 5px",
    fontWeight: 600,
  } as CSSProperties,
  listItem: (hovered: boolean) =>
    ({
      padding: "10px 15px",
      backgroundColor: hovered ? cyan50 : "#898AA6",
      color: "white",
      marginBottom: 1,
      display: "flex",
      justifyContent: "space-between",
      transition: "0.3s",
    } as CSSProperties),
  listItemInfo: { display: "flex", flexDirection: "column" } as CSSProperties,
};

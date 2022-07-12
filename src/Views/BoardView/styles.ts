import { green60, red60 } from "@carbon/colors";
import { CSSProperties } from "react";

export const styles = {
  mainContainer: {
    margin: "100px auto",
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
};

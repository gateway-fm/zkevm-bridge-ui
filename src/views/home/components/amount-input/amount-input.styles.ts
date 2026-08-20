import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useAmountInputStyles = createUseStyles((theme: Theme) => ({
  amountInput: {
    "&:disabled": {
      backgroundColor: "transparent",
    },
    border: "none",
    borderRadius: 8,
    fontSize: "20px",
    lineHeight: "24px",
    outline: "none",
    textAlign: "right",
    width: "100%",
    [theme.breakpoints.upSm]: {
      fontSize: (value: number) => (value < 16 ? "40px" : "30px"),
      lineHeight: "40px",
    },
  },
  maxButton: {
    "&:not(:disabled)": {
      cursor: "pointer",
    },
    background: "none",
    border: "none",
    color: theme.palette.black,
    padding: theme.spacing(1),
  },
  maxText: {
    color: theme.palette.black,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.upSm]: {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

export const useAmountInputRedesignStyles = createUseStyles((theme: Theme) => ({
  amountInput: {
    "&::placeholder": {
      color: "rgba(28, 28, 28, 0.2)",
    },
    "&:disabled": {
      backgroundColor: "transparent",
    },
    border: "none",
    borderRadius: 8,
    color: theme.palette.black,
    fontSize: "20px",
    height: "100%",
    lineHeight: "24px",
    outline: "none",
    textAlign: "right",
    width: "60%",
    [theme.breakpoints.upSm]: {
      fontSize: (value: number) => (value < 16 ? "48px" : "30px"),
      lineHeight: "48px",
    },
  },
  maxButton: {
    "&:disabled": {
      opacity: 0.5,
    },
    "&:not(:disabled)": {
      cursor: "pointer",
    },
    background: "rgba(29, 74, 225, 0.1)",
    border: "none",
    borderRadius: 8,
    color: theme.palette.primary.main,
    height: 41,
    padding: "0 20px",
  },
  maxText: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    gap: theme.spacing(1.5),
    justifyContent: "flex-end",
    marginLeft: theme.spacing(1),
    [theme.breakpoints.upSm]: {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

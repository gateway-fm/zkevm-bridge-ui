import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useBridgeFormStyles = createUseStyles((theme: Theme) => ({
  arrowDownIcon: {
    backgroundColor: theme.palette.grey.main,
    borderRadius: "50%",
    display: "flex",
    [theme.breakpoints.upSm]: {
      height: 40,
      padding: theme.spacing(0.5),
      width: 40,
    },
  },
  arrowRow: {
    display: "flex",
    justifyContent: "center",
    margin: [theme.spacing(1), 0],
    [theme.breakpoints.upSm]: {
      margin: [theme.spacing(2), 0],
    },
  },
  button: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    margin: [theme.spacing(5), "auto"],
  },
  card: {
    padding: [theme.spacing(2), theme.spacing(3)],
  },
  form: {
    margin: "auto",
    maxWidth: theme.maxWidth,
  },
  fromChain: {
    "&:hover": {
      backgroundColor: theme.palette.grey.light,
    },
    alignItems: "center",
    background: "none",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(0.75),
    marginBottom: -theme.spacing(0.75),
    marginLeft: -theme.spacing(1.25),
    marginTop: theme.spacing(0.5),
    padding: [theme.spacing(0.75), theme.spacing(1.25)],
    transition: theme.hoverTransition,
    [theme.breakpoints.upSm]: {
      gap: theme.spacing(1.25),
    },
  },
  icons: {
    height: 20,
    width: 20,
    [theme.breakpoints.upSm]: {
      height: 24,
      width: 24,
    },
  },
  leftBox: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  middleRow: {
    borderTop: `1px solid ${theme.palette.grey.light}`,
    marginTop: theme.spacing(1.25),
    padding: [theme.spacing(2), 0, 0],
  },
  rightBox: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(0.5),
  },
  spinner: {
    margin: "auto",
    marginTop: theme.spacing(7),
  },
  toChain: {
    alignItems: "center",
    background: "none",
    border: "none",
    borderRadius: 8,
    display: "flex",
    gap: theme.spacing(0.75),
    marginBottom: -theme.spacing(0.75),
    marginLeft: -theme.spacing(1.25),
    marginTop: theme.spacing(0.5),
    padding: [theme.spacing(0.75), theme.spacing(1.25)],
    [theme.breakpoints.upSm]: {
      gap: theme.spacing(1.25),
    },
  },
  tokenSelector: {
    "&:hover": {
      backgroundColor: theme.palette.grey.main,
    },
    alignItems: "center",
    backgroundColor: theme.palette.grey.light,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(1),
    padding: [theme.spacing(1), theme.spacing(1.25)],
    transition: theme.hoverTransition,
    [theme.breakpoints.upSm]: {
      backgroundColor: theme.palette.grey.light,
      gap: theme.spacing(2),
      padding: [theme.spacing(1.5), theme.spacing(2)],
    },
  },
}));

export const useBridgeFormRedesignStyles = createUseStyles((theme: Theme) => ({
  button: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    margin: [theme.spacing(3), "auto"],
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2.5),
    maxWidth: theme.maxWidth,
  },
  form: {
    margin: "auto",
    width: "100%",
  },
  fromChain: {
    alignItems: "center",
    background: "none",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(0.75),
    marginBottom: -theme.spacing(0.75),
    marginTop: theme.spacing(0.5),
    padding: [theme.spacing(0.75), theme.spacing(1.25)],
    [theme.breakpoints.downM]: {
      gap: theme.spacing(1.25),
      maxWidth: "100%",
    },
  },
  icons: {
    height: 20,
    width: 20,
    [theme.breakpoints.upSm]: {
      height: 24,
      width: 24,
    },
  },
  leftBox: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.downM]: {
      maxWidth: "57%",
    },
  },
  middleRow: {
    marginTop: theme.spacing(1.25),
  },
  rightBox: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: "40%",
    textOverflow: "ellipsis",
    transition: theme.hoverTransition,
    whiteSpace: "nowrap",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "100%",
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.downM]: {
      gap: 6,
    },
  },
  selectedChainName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  spinner: {
    margin: "auto",
    marginTop: theme.spacing(7),
  },
  toChain: {
    alignItems: "center",
    background: "none",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    borderRadius: 8,
    display: "flex",
    gap: theme.spacing(0.75),
    marginBottom: -theme.spacing(0.75),
    marginTop: theme.spacing(0.5),
    padding: [theme.spacing(0.75), theme.spacing(1.25)],
    [theme.breakpoints.upSm]: {
      gap: theme.spacing(1.25),
    },
    [theme.breakpoints.downM]: {
      maxWidth: "100%",
      padding: `${theme.spacing(0.75)}px ${theme.spacing(1.25)}px`,
    },
  },

  tokenSelector: {
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.07)",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    gap: theme.spacing(1),
    maxWidth: "50%",
    overflow: "hidden",
    padding: [theme.spacing(1), theme.spacing(1.25)],
    textOverflow: "ellipsis",
    transition: theme.hoverTransition,
    [theme.breakpoints.upSm]: {
      backgroundColor: theme.palette.white,
      gap: theme.spacing(2),
      padding: [theme.spacing(1.5), theme.spacing(2)],
      whiteSpace: "nowrap",
    },
  },
  tokenSelectorSymbol: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useHeaderStyles = createUseStyles((theme: Theme) => ({
  block: {
    display: "flex",
    flex: 1,
    gap: theme.spacing(0.75),
  },
  bottomRow: {
    marginTop: theme.spacing(1.25),
  },
  centerBlock: {
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: [theme.spacing(1.5), "auto", 0],
    position: "relative",
    width: "100%",
    [theme.breakpoints.upSm]: {
      margin: [theme.spacing(3), "auto", 0],
    },
  },
  icon: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    [theme.breakpoints.upSm]: {
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
    },
  },
  leftBlock: {
    justifyContent: "left",
  },
  rightBlock: {
    justifyContent: "end",
  },
  sideButton: {
    "&:hover": {
      backgroundColor: theme.palette.grey.main,
    },
    alignItems: "center",
    backgroundColor: theme.palette.white,
    borderRadius: 50,
    cursor: "pointer ",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    transition: theme.hoverTransition,
    [theme.breakpoints.upSm]: {
      padding: theme.spacing(1.25),
    },
  },
  topRow: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

export const useHeaderRedesignStyles = createUseStyles((theme: Theme) => ({
  block: {
    display: "flex",
    flex: 1,
    gap: theme.spacing(0.75),
  },
  bottomRow: {
    marginTop: theme.spacing(1.25),
  },
  centerBlock: {
    justifyContent: "center",
    textAlign: "center",
  },
  header: {
    // alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // margin: [theme.spacing(1.5), "auto", 0],
    position: "relative",
    width: "100%",
    [theme.breakpoints.upSm]: {
      margin: [theme.spacing(3), "auto", 0],
    },
  },
  // Page title, matching the network heading as rendered on the bridge screen.
  headerTitle: {
    fontSize: 48,
    fontWeight: 500,
    [theme.breakpoints.downM]: {
      fontSize: 28,
    },
  },
  icon: {
    height: theme.spacing(2),
    width: theme.spacing(2),
    [theme.breakpoints.upSm]: {
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
    },
  },
  leftBlock: {
    justifyContent: "left",
  },
  rightBlock: {
    justifyContent: "end",
  },
  sideButton: {
    alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.07)",
    borderRadius: 50,
    cursor: "pointer ",
    display: "flex",
    justifyContent: "center",
    padding:[ theme.spacing(0.8), theme.spacing(1), theme.spacing(0.6)],
    transition: theme.hoverTransition,
 
  },
  topRow: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

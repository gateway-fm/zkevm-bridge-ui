import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useHeaderStyles = createUseStyles((theme: Theme) => ({
  activityLabel: {
    display: "none",
    [theme.breakpoints.upSm]: {
      display: "block",
    },
  },
  block: {
    display: "flex",
    flex: 1,
    gap: theme.spacing(0.75),
  },
  centerBlock: {
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    display: "flex",
    margin: [theme.spacing(2), "auto", 0],
    width: "100%",
  },
  leftBlock: {
    justifyContent: "left",
  },
  link: {
    backgroundColor: theme.palette.grey.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
    alignItems: "center",
    borderRadius: 8,
    display: "flex",
    gap: theme.spacing(1),
    padding: [theme.spacing(0.75), theme.spacing(1)],
    transition: theme.hoverTransition,
  },
  logo: {
    height: 56,
  },
  rightBlock: {
    justifyContent: "end",
  },
  appName: {
    background: theme.palette.grey.main,
    borderRadius: 56,
    margin: "0px auto",
    marginBotton: "4px",
    // marginBottom: theme.spacing(5),
    // padding: [theme.spacing(1.25), theme.spacing(4)],
  },
}));

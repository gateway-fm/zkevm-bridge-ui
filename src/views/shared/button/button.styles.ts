import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useButtonStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      backgroundColor: theme.palette.grey.dark,
      cursor: "default",
      opacity: 0.4,
    },
    "&:hover&:not(:disabled)": {
      backgroundColor: theme.palette.primary.dark,
    },
    alignItems: "center",
    backgroundColor: theme.palette.primary.mainRedesign,
    border: "none",
    borderRadius: 16,
    color: theme.palette.white,
    cursor: "pointer",
    display: "flex",
    fontSize: "16px",
    height: 38,
    justifyContent: "center",
    minWidth: "160px",
    padding: [0, theme.spacing(4)],
    transition: theme.hoverTransition,
  },
  paddedSpinner: {
    paddingLeft: theme.spacing(1.5),
  },
}));

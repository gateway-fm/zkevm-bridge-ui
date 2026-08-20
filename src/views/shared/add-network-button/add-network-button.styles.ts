import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useAddNetworkButtonStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      cursor: "inherit",
      opacity: 0.5,
    },
    "&:hover:not(:disabled)": {
      background: theme.palette.grey.light,
    },
    alignItems: "center",
    appearance: "none",
    backgroundColor: theme.palette.white,
    border: "1px solid rgba(28, 28, 28, 0.1)",
    borderRadius: 16,
    color: theme.palette.black,
    cursor: "pointer",
    display: "flex",
    fontSize: 14,
    gap: theme.spacing(1),
    height: 38,
    justifyContent: "center",
    padding: [0, theme.spacing(1.5)],
    whiteSpace: "nowrap",
  },
  icon: {
    width: 20,
  },
}));

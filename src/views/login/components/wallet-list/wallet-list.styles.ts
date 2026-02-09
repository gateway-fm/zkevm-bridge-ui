import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useWalletListStyles = createUseStyles((theme: Theme) => ({
  wallet: {
    "&:hover": {
      background: "#e2e5ee",
    },
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    padding: [theme.spacing(3), theme.spacing(4)],
    transition: theme.hoverTransition,
  },
  walletIcon: {
    marginRight: theme.spacing(2),
  },
  walletInfo: {
    flex: 1,
  },
  walletList: {
    listStyle: "none",
    margin: 0,
    paddingLeft: 0,
  },
  walletName: {
    marginBottom: theme.spacing(1),
  },
}));
export const useWalletListRedesignStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      cursor: "inherit",
    },
    alignItems: "center",
    appearance: "none",
    backgroundColor: theme.palette.primary.mainRedesign,
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 8,
    color: theme.palette.white,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    padding: [theme.spacing(1), theme.spacing(1)],
    width: "100%",
    [theme.breakpoints.downM]: {
      fontSize: 14,
    },
  },
  
  buttonWalletTitle: {
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.downM]: {
      gap: theme.spacing(0.1),
    },
  },

  card: {
    display: "flex",
    flexDirection: "column",
    margin: [0, "auto", theme.spacing(3)],
  },
  cardBox: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    padding: theme.spacing(2),
  },
    smallTitle: {
    color: "#78798d",
    fontSize: 12,
    fontWeight: 400,
  },
  wallet: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    transition: theme.hoverTransition,
  },
  walletIcon: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.downM]: {
      marginRight: theme.spacing(1),
    },
  },
  walletInfo: {
    flex: 1,
  },
  walletList: {
    listStyle: "none",
    margin: 0,
    paddingLeft: 0,
  },

  walletName: {
    color: theme.palette.white,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.downM]: {
      fontSize: 12,
      marginLeft: theme.spacing(0.5),
    },
  },
}));

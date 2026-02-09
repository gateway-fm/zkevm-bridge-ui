import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useNetworkBoxStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      cursor: "inherit",
      opacity: 0.75,
    },
    "&:hover:not(:disabled)": {
      background: theme.palette.grey.main,
    },
    alignItems: "center",
    appearance: "none",
    background: theme.palette.grey.light,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    padding: [theme.spacing(1), theme.spacing(1.5)],
    transition: theme.hoverTransition,
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    width: 20,
  },
  buttons: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(4),
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.dark,
  },
  list: {
    paddingLeft: theme.spacing(2),
    width: "100%",
    wordBreak: "break-word",
  },
  listItem: {
    padding: [theme.spacing(0.25), 0],
  },
  networkBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));

export const useNetworkBoxRedesignStyles = createUseStyles((theme: Theme) => ({
  button: {
    "&:disabled": {
      backgroundColor: theme.palette.grey.dark,
      cursor: "inherit",
      opacity: 0.4,
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
  },
  buttonArrow: {
    display: "flex",
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    width: 25,
  },
  buttonIconAndTitle: {
    alignItems: "center",
    display: "flex",
    lineHeight: 0,
  },
  buttonRounded: {
    "&:hover": {
      background: theme.palette.grey.light,
    },
    alignItems: "center",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 28,
    display: "flex",
    fontSize: 12,
    height: 30,
    justifyContent: "center",
    padding: [theme.spacing(2), theme.spacing(1.5)],
    transition: "all 0.2s ease-in-out",
    [theme.breakpoints.downM]: {
      borderRadius: 50,
      padding: `${theme.spacing(1)}px ${theme.spacing(0.9)}px ${theme.spacing(1.5)}px`,
    },
  },
  buttons: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(4),
    textAlign: "center",
  },
  buttonText: {
    lineHeight: 0,
  },
  connectWalletBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: "40px",
  },

  link: {
    color: theme.palette.primary.dark,
  },
  list: {
    width: "100%",
    wordBreak: "break-word",
    [theme.breakpoints.downM]: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },

  listIcon: {
    color: "#78798d",
    display: "flex",
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    width: 12,
  },

  listItem: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: [theme.spacing(0.5), 0],
    [theme.breakpoints.downM]: {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  listItemLabel: {
    fontSize: 14,
    fontWeight: 500,
  },
  listItemValue: {
    "&:hover:not(:disabled)": {
      boxShadow: `
       2px 2px 6px rgba(0, 0, 0, 0.2),
       -2px -2px 6px rgba(255, 255, 255, 0.8)
     `,
      transform: "translateY(-1px)",
    },
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    fontSize: 12,
    justifyContent: "center",
    padding: "4px 8px",
    transition: "all 0.3s ease-in-out",
    [theme.breakpoints.downM]: {
      padding: [theme.spacing(1), theme.spacing(2)],
      width: "100%",
    },
  },
  networkBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  reportIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(0.5),
    width: 15,
    [theme.breakpoints.downM]: {
      marginRight: 0,
    },
  },
  reportTitle: {
    marginTop: theme.spacing(0.4),
    [theme.breakpoints.downM]: {
      display: "none",
    },
  },

  titlesBox: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    justifyContent: "center",
  },
}));

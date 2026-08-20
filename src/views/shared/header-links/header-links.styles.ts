import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useHeaderLinksRedesignStyles = createUseStyles((theme: Theme) => ({
  burgerMenu: {
    display: "none",
    [theme.breakpoints.downM]: {
      border: "none",
      display: "block",
      maxHeight: 30,
      opacity: 0.6,
      transition: "transform 0.3s ease",
      width: 30,
      zIndex: 99,
    },
  },

  button: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.mainRedesign,
    border: "none",
    borderRadius: 16,
    color: theme.palette.white,
    cursor: "pointer",
    display: "flex",
    fontSize: 16,
    height: 38,
    justifyContent: "center",
    padding: [0, theme.spacing(2.5)],
    [theme.breakpoints.downM]: {
      display: "none",
    },
  },

  icon: {
    width: 14,
  },
  linkItem: {
    color: theme.palette.black,
    fontSize: 14,
    textDecoration: "none",
    transition: "color 0.3s",
    [theme.breakpoints.downM]: {
      color: theme.palette.primary.mainRedesign,
      position: "relative",
    },
  },
  linksAndLogoContainer: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.downM]: {
      justifyContent: "space-between",
      marginLeft: 0,
      marginTop: theme.spacing(3),
      width: "100%",
    },
  },
  linksContainer: {
    "& a:hover": {
      color: theme.palette.primary.main,
    },
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(3),
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)",

    [theme.breakpoints.downM]: {
      alignItems: "center",
      backgroundColor: theme.palette.white,
      borderRadius: 12,
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      flexDirection: "column",
      fontSize: 22,
      gap: theme.spacing(2),
      justifyContent: "center",
      left: "auto",
      padding: theme.spacing(3),
      position: "absolute",
      right: 24,
      textAlign: "center",
      top: 70,
      transform: "none",
      width: "90vw",
      zIndex: 99,
    },
  },
  logo: {
    cursor: "pointer",
  },
  openedBurgerMenuIcon: {
    transform: "rotate(90deg) ",
  },
  rightButtons: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1.5),
  },

  wrapper: {
    alignItems: "center",
    borderBottom: "1px solid rgba(28, 28, 28, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(3),
    paddingInline: theme.spacing(5),
    paddingTop: theme.spacing(3),
    position: "relative",

    [theme.breakpoints.downM]: {
      paddingBottom: theme.spacing(1),
      paddingInline: theme.spacing(3),
      paddingTop: theme.spacing(1),
    },
  },
}));

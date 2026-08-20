import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useLoginStyles = createUseStyles((theme: Theme) => ({
  appName: {
    background: theme.palette.grey.main,
    borderRadius: 56,
    margin: "0px auto",
    marginBottom: theme.spacing(5),
    padding: [theme.spacing(1.25), theme.spacing(4)],
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: [0, "auto", theme.spacing(3)],
  },
  cardHeader: {
    padding: [theme.spacing(3), theme.spacing(4), theme.spacing(2)],
  },
  cardHeaderCentered: {
    textAlign: "center",
  },
  cardWrap: {
    margin: [theme.spacing(3), 0],
    width: "100%",
  },
  contentWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: theme.maxWidth,
    width: "100%",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    padding: [0, theme.spacing(2)],
  },
  logo: {
    height: 120,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  networkBoxWrapper: {
    margin: [0, "auto", theme.spacing(3)],
    maxWidth: theme.maxWidth,
    width: "100%",
  },
}));

export const useLoginRedesignStyles = createUseStyles((theme: Theme) => ({
  appName: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "8px",
    cursor: "default",
    display: "flex",
    fontSize: 14,
    gap: 8,
    justifyContent: "center",
    margin: theme.spacing(5),
    padding: "4px 8px",
    transition: "all 0.3s ease-in-out",
    [theme.breakpoints.downM]: {
      margin: theme.spacing(3),
    },
  },
  appNameIcon: {
    width: 16,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: [0, "auto", theme.spacing(3)],
  },
  cardHeader: {
    padding: [theme.spacing(3), theme.spacing(4), theme.spacing(2)],
  },
  cardHeaderCentered: {
    textAlign: "center",
  },
  cardWrap: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    margin: [theme.spacing(3), 0],
    width: "100%",
  },
  contentWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    maxWidth: theme.maxWidth,
    width: "100%",
  },

  login: {
    display: "flex",
    flexDirection: "column",
    padding: [0, theme.spacing(2)],
  },
  logo: {
    height: 120,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.downM]: {
      height: 80,
      marginBottom: theme.spacing(3),
    },
  },
  networkBoxWrapper: {
    margin: [0, "auto", theme.spacing(3)],
    maxWidth: theme.maxWidth,
    width: "100%",
  },

  networkLogo: {
    height: 56,
  },
  networkName: {
    fontSize: 48,
    [theme.breakpoints.downM]: {
      fontSize: 22,
    },
  },
  networkTopBox: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },

}));

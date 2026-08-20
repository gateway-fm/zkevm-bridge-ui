import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useLayoutStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: [0, "auto"],
    paddingBottom: theme.spacing(2),
    width: "100%",
  },
  // With brand components the footer follows the content instead of being
  // pushed to the viewport bottom.
  containerCompact: {
    flex: "0 0 auto",
  },
  layout: {
    backgroundColor: theme.palette.grey.light, 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  },

  linkContainer: {
    marginTop: theme.spacing(2),
  },
  poweredLogoBox: {
    alignItems: "center",
    display: "flex",
    gap: theme.spacing(1.5),
    justifyContent: "center",
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(4),
  },
  wrapper: {},
}));

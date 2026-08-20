import { createUseStyles } from "react-jss";

import { brand } from "src/brands";
import { Theme } from "src/styles/theme";

export const useAppStyles = createUseStyles((theme: Theme) => ({
  // Font faces are supplied by the active brand (src/brands).
  "@font-face": brand.fontFaces,
  "@global": {
    "#app-root": {
      alignItems: "center",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      position: "relative",
      zIndex: 0,
    
    },
    "#portal-root": {
      zIndex: 1,
    },
    "*": {
      boxSizing: "border-box",
    },
    a: {
      color: "inherit",
      textDecoration: "none",
    },
    body: {
      backgroundColor: theme.palette.grey.light,
      color: theme.palette.black,
      display: "flex",
      flexDirection: "column",
      fontFamily: theme.fontFamily,
      fontSize: 16,
      margin: 0,
      maxHeight: "100%",
      overflowX: "hidden",
      padding: 0,


    },
    button: {
      "&:hover:not(:disabled)": {
        boxShadow: `
       2px 2px 6px rgba(0, 0, 0, 0.2),
       -2px -2px 6px rgba(255, 255, 255, 0.8)
     `,
        transform: "translateY(-2px)",
      },
      transition: "all 0.2s ease-in-out",
    },

    "input[type='search']::-webkit-search-cancel-button": {
      "-webkit-appearance": "none",
    },
  },
}));

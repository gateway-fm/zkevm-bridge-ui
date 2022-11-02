import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

const useTokenListStyles = createUseStyles((theme: Theme) => ({
  tokenList: {
    display: "flex",
    flexDirection: "column",
  },
  searchInputContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: [0, theme.spacing(2)],
    borderBottom: `1px solid ${theme.palette.grey.light}`,
  },
  searchInput: {
    width: "100%",
    border: 0,
    outline: 0,
    lineHeight: "36px",
  },
  searchIcon: {
    marginRight: theme.spacing(1),
  },
  clearSearchButton: {
    border: 0,
    padding: theme.spacing(0.5),
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    transition: theme.hoverTransition,
    background: theme.palette.grey.dark,
    "&:hover": {
      background: theme.palette.black,
    },
  },
  clearSearchButtonIcon: {
    "& rect": {
      fill: theme.palette.white,
      strokeWidth: 2,
      stroke: theme.palette.white,
    },
  },
  list: {
    overflowY: "auto",
    height: 376,
    margin: [theme.spacing(2)],
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey.main,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.palette.grey.dark,
    },
  },
  centeredElement: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenButtonWrapper: {
    position: "relative",
    "&:not(:first-of-type)": {
      marginTop: theme.spacing(1),
    },
  },
  tokenButton: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.grey.light,
    borderRadius: 8,
    overflow: "hidden",
    border: "none",
    cursor: "pointer",
    padding: theme.spacing(2),
    transition: theme.hoverTransition,
    "&:hover": {
      background: theme.palette.grey.main,
    },
  },
  tokenInfo: {
    display: "flex",
    alignItems: "center",
  },
  tokenInfoWithBalance: {
    display: "flex",
    alignItems: "center",
    marginRight: 48,
  },
  tokenIcon: {
    marginRight: theme.spacing(1),
  },
  addTokenButton: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    minWidth: 120,
    cursor: "pointer",
    borderRadius: 8,
    background: theme.palette.white,
    padding: 8,
    "&:hover": {
      background: theme.palette.grey.main,
    },
  },
  tokenBalanceWrapper: {
    marginLeft: "auto",
  },
  tokenBalance: {
    color: theme.palette.black,
  },
  tokenInfoButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    height: 32,
    width: 32,
    padding: 8,
    background: "transparent",
    cursor: "pointer",
    borderRadius: "50%",
    "&:hover": {
      background: theme.palette.grey.main,
    },
  },
  tokenInfoButtonIcon: {
    "& path": {
      fill: theme.palette.grey.dark,
    },
  },
}));

export default useTokenListStyles;

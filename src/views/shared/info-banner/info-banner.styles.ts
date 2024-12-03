import { createUseStyles } from "react-jss";

import { theme, Theme } from "src/styles/theme";

export const useInfoBannerStyles = createUseStyles((theme: Theme) => ({
  infoBanner: {
    background: theme.palette.lightBlack,
    borderRadius: "8px",
    display: "flex",
    gap: theme.spacing(1),
    maxWidth: theme.maxWidth,
    padding: theme.spacing(2),
    width: "100%",
  },
  message: {
    color: theme.palette.white,
  },
}));

import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useBillionsRewardBannerStyles = createUseStyles((theme: Theme) => ({
  banner: {
    alignItems: "flex-start",
    background: theme.palette.primary.light,
    borderRadius: 12,
    color: "#000000",
    display: "flex",
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    width: "100%",
  },
  icon: {
    flexShrink: 0,
    height: 24,
    marginTop: 2,
    width: 24,
  },
  message: {
    color: "#000000",
  },
}));

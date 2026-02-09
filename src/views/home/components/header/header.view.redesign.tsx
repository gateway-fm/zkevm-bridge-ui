import { FC } from "react";
import { Link } from "react-router-dom";

import ClockIcon from "src/assets/icons/clock.svg?react";
import SettingIcon from "src/assets/icons/setting.svg?react";
import { useEnvContext } from "src/contexts/env.context";
import { routes } from "src/routes";
import { areSettingsVisible } from "src/utils/feature-toggles";
import { useHeaderRedesignStyles } from "src/views/home/components/header/header.styles";
import { NetworkSelectorRedesign } from "src/views/shared/network-selector/network-selector.view.redesign";
import { Typography } from "src/views/shared/typography/typography.view";

export const HeaderRedesign: FC = () => {
  const classes = useHeaderRedesignStyles();
  const env = useEnvContext();

  if (!env) {
    return null;
  }

  const networkName = env.networkName;
  const logoPath = env.logoPath;

  return (
    <header className={classes.header}>
      <div className={`${classes.block} ${classes.leftBlock}`}>
        {areSettingsVisible(env) && (
          <Link className={classes.link} title="Settings" to={routes.settings.path}>
            <SettingIcon />
          </Link>
        )}
        <Link className={classes.link} to={routes.activity.path}>
          <ClockIcon />
          <Typography className={classes.activityLabel} type="body1">
            Activity
          </Typography>
        </Link>
      </div>
      <div
        className={`${classes.block} ${classes.centerBlock}`}
        style={logoPath ? undefined : {
          fontSize:
            typeof window !== "undefined" && window.innerWidth <= 788
              ? 28
              : networkName && networkName.replace(/\s/g, "").length > 10
                ? 48
                : 62,
        }}
      >
        {logoPath ? <img className={classes.logo} src={logoPath} alt={networkName} /> : networkName}
      </div>
      <div className={`${classes.block} ${classes.rightBlock}`}>
        <NetworkSelectorRedesign />
      </div>
    </header>
  );
};

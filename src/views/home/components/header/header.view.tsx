import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ClockIcon } from "src/assets/icons/clock.svg";
import { ReactComponent as SettingIcon } from "src/assets/icons/setting.svg";
import { ReactComponent as Logo } from "src/assets/polygon-zkevm-logo.svg";
import { useEnvContext } from "src/contexts/env.context";
import { routes } from "src/routes";
import { areSettingsVisible } from "src/utils/feature-toggles";
import { useHeaderStyles } from "src/views/home/components/header/header.styles";
import { NetworkSelector } from "src/views/shared/network-selector/network-selector.view";
import { Typography } from "src/views/shared/typography/typography.view";
import { getDeploymentName } from "../../../../utils/labels";

type HeaderProps = {
  hideActivity?: boolean;
  showName?: boolean;
};

export const Header: FC<HeaderProps> = ({ hideActivity, showName }) => {
  const classes = useHeaderStyles();
  const env = useEnvContext();

  if (!env) {
    return null;
  }

  const ethereumChain = env.chains[0];
  const deploymentName = getDeploymentName(ethereumChain);
  const appName = deploymentName !== undefined ? `${deploymentName} Bridge` : "Bridge";

  const logo = env.logoPath;

  const companyPage = "https://www.humanity.org/"

  return (
    <header className={classes.header}>
      <div className={`${classes.block} ${classes.leftBlock}`}>
        {areSettingsVisible(env) && (
          <Link className={classes.link} title="Settings" to={routes.settings.path}>
            <SettingIcon />
          </Link>
        )}
        <Link className={classes.block} to={companyPage || routes.home.path}>
          {logo ? <img className={classes.logo} src={logo}></img> : <Logo className={classes.logo} />}
        </Link>
      </div>
      <div className={`${classes.link} ${classes.centerBlock}`}>
        <Typography className={classes.activityLabel} type="body1">
          {!hideActivity && <ClockIcon/>}
          {!hideActivity && <>
            <Link className={classes.link} to={routes.activity.path}>
              Activity
            </Link>
          </>}
          {showName && <Link className={classes.link} to={companyPage || routes.login.path}>
            {appName}
          </Link>}
        </Typography>
      </div>
      <div className={`${classes.block} ${classes.rightBlock}`}>
        <NetworkSelector />
      </div>
    </header>
  );
};

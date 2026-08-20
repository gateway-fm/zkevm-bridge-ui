import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { NetworkSelectorRedesign } from "../network-selector/network-selector.view.redesign";
import ArrowLeftIcon from "src/assets/icons/arrow-left.svg?react";
import { RouterState } from "src/domain";
import { routes } from "src/routes";
import { useHeaderRedesignStyles } from "src/views/shared/header/header.styles";

type HeaderProps = {
  Subtitle?: ReactElement;
  backTo: { routeKey: keyof typeof routes; state?: RouterState };
  title: string;
};

export const HeaderRedesign: FC<HeaderProps> = ({ backTo, Subtitle, title }) => {
  const classes = useHeaderRedesignStyles();
  const route = routes[backTo.routeKey].path;

  return (
    <header className={classes.header}>
      <div className={classes.topRow}>
        <div className={`${classes.block}`}>
          <button className={`${classes.sideButton} ${classes.leftBlock} `}>
            <Link state={backTo.state} to={route}>
              <ArrowLeftIcon className={classes.icon} />
            </Link>
          </button>
        </div>
        <div className={`${classes.block} ${classes.centerBlock}`}>
          <div className={classes.headerTitle}>{title}</div>
        </div>
        <div className={`${classes.block} ${classes.rightBlock}`}>
          <NetworkSelectorRedesign />
        </div>
      </div>
      {Subtitle && <div className={classes.bottomRow}>{Subtitle}</div>}
    </header>
  );
};

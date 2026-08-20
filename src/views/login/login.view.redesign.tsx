import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WalletListRedesign } from "./components/wallet-list/wallet-list.view.redesign";
import { routerStateParser } from "src/adapters/browser";
import { useEnvContext } from "src/contexts/env.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { WalletName } from "src/domain";
import { routes } from "src/routes";
import { useLoginRedesignStyles } from "src/views/login/login.styles";
import { BrandHeading } from "src/views/shared/brand-heading/brand-heading.view";
import { ErrorMessage } from "src/views/shared/error-message/error-message.view";
import { Typography } from "src/views/shared/typography/typography.view";

export const LoginRedesign: FC = () => {
  const classes = useLoginRedesignStyles();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { state } = useLocation();
  const { connectedProvider, connectProvider } = useProvidersContext();
  const env = useEnvContext();

  const onSelectWallet = (walletName: WalletName) => {
    void connectProvider(walletName);
  };

  useEffect(() => {
    if (connectedProvider.status === "successful") {
      const routerState = routerStateParser.safeParse(state);

      if (routerState.success) {
        navigate(routerState.data.redirectUrl, { replace: true });
      } else {
        navigate(routes.home.path, { replace: true });
      }
    }
  }, [connectedProvider, state, navigate]);

  if (!env) {
    return null;
  }

  const name = env.networkName;
  const logoPath = env.logoPath;

  return (
    <div className={classes.login}>
      <div className={classes.contentWrapper}>
        <div className={classes.networkTopBox}>
          {logoPath ? (
            <img alt={name} className={classes.networkLogo} src={logoPath} />
          ) : (
            <Typography className={classes.networkName} type="body1">
              <BrandHeading name={name ? name : env.chains[1].name} />
            </Typography>
          )}
        </div>
        <div className={classes.cardWrap}>
          <WalletListRedesign onSelectWallet={onSelectWallet} />
          {connectedProvider.status === "failed" && (
            <ErrorMessage error={connectedProvider.error} />
          )}
        </div>
      </div>
    </div>
  );
};

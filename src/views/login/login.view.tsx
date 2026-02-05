import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routerStateParser } from "src/adapters/browser";
import Logo from "src/assets/polygon-zkevm-logo.svg?react";
import { useEnvContext } from "src/contexts/env.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { EthereumChainId, WalletName } from "src/domain";
import { routes } from "src/routes";
import { WalletList } from "src/views/login/components/wallet-list/wallet-list.view";
import { useLoginStyles } from "src/views/login/login.styles";
import { Card } from "src/views/shared/card/card.view";
import { ErrorMessage } from "src/views/shared/error-message/error-message.view";
import { InfoBanner } from "src/views/shared/info-banner/info-banner.view";
import { NetworkBox } from "src/views/shared/network-box/network-box.view";
import { Typography } from "src/views/shared/typography/typography.view";

export const Login: FC = () => {
  const classes = useLoginStyles();
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

  const logo = env.logoPath;
  const name = env.networkName;
  const ethereumChain = env.chains[0];
  const appName = name ? `${name} Bridge` : "Bridge";

  return (
    <div className={classes.login}>
      <div className={classes.contentWrapper}>
        {logo ? <img className={classes.logo} src={logo}></img> : <Logo className={classes.logo} />}
        <Typography className={classes.appName} type="body1">
          {appName}
        </Typography>
        <div className={classes.networkBoxWrapper}>
          <NetworkBox />
        </div>
        {ethereumChain.chainId !== EthereumChainId.MAINNET && (
          <InfoBanner message={`Connect with ${ethereumChain.name} environment`} />
        )}
        <div className={classes.cardWrap}>
          <Card className={classes.card}>
            <>
              <Typography className={classes.cardHeader} type="h1">
                Connect a wallet
              </Typography>
              <WalletList onSelectWallet={onSelectWallet} />
            </>
          </Card>
          {connectedProvider.status === "failed" && (
            <ErrorMessage error={connectedProvider.error} />
          )}
        </div>
      </div>
    </div>
  );
};

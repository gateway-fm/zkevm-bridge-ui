import { FC } from "react";

import { WalletIconRedesign } from "../wallet-icon/wallet-icon.view.redesign";
import CaretRightIcon from "src/assets/icons/caret-right.svg?react";
import { WalletName } from "src/domain";
import { useWalletListRedesignStyles } from "src/views/login/components/wallet-list/wallet-list.styles";
import { CardRedesign } from "src/views/shared/card/card.view.redesign";
import { Typography } from "src/views/shared/typography/typography.view";

type WalletListProps = {
  onSelectWallet: (walletName: WalletName) => void;
};

export const WalletListRedesign: FC<WalletListProps> = ({ onSelectWallet }) => {
  const classes = useWalletListRedesignStyles();

  return (
    <CardRedesign>
      <div className={classes.cardBox}>
        <div className={classes.largeTitle}>Connect a wallet</div>
        <ul className={classes.walletList}>
          <li
            className={classes.wallet}
            onClick={() => onSelectWallet(WalletName.METAMASK)}
            role="button"
          >
            <div className={classes.walletInfo}>
              <button className={classes.button}>
                <div className={classes.buttonWalletTitle}>
                  <WalletIconRedesign
                    className={classes.walletIcon}
                    size="sm"
                    walletName={WalletName.METAMASK}
                  />
                  Connect with
                  <Typography className={classes.walletName} type="body1">
                    {WalletName.METAMASK}
                  </Typography>
                </div>
                <CaretRightIcon />
              </button>
            </div>
          </li>
        </ul>{" "}
      </div>
    </CardRedesign>
  );
};

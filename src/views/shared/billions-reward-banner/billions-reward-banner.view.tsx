import { FC } from "react";

import InfoCircleIcon from "src/assets/icons/info-circle.svg?react";
import { useEnvContext } from "src/contexts/env.context";
import { useBillionsRewardBannerStyles } from "src/views/shared/billions-reward-banner/billions-reward-banner.styles";
import { Typography } from "src/views/shared/typography/typography.view";

type BillionsRewardBannerProps = {
  className?: string;
};

export const BillionsRewardBanner: FC<BillionsRewardBannerProps> = ({ className }) => {
  const classes = useBillionsRewardBannerStyles();
  const env = useEnvContext();

  if (!env?.isBillionsRewardBannerEnabled) {
    return null;
  }

  return (
    <div className={`${classes.banner} ${className ?? ""}`}>
      <InfoCircleIcon className={classes.icon} />
      <Typography className={classes.message} type="body2">
        To claim &amp; stake your Billions Reward, bridge a total of <strong>0.003 ETH</strong> from
        Ethereum Mainnet to Billions. <strong>0.001 ETH</strong> is required for covering gas fees
      </Typography>
    </div>
  );
};

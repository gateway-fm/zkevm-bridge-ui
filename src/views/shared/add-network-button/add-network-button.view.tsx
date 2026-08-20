import { useMemo, useState } from "react";

import { parseError } from "src/adapters/error";
import MetaMaskIcon from "src/assets/icons/metamask.svg?react";
import { useEnvContext } from "src/contexts/env.context";
import { useErrorContext } from "src/contexts/error.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useUIContext } from "src/contexts/ui.context";
import { Message } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { isMetaMaskUserRejectedRequestError } from "src/utils/types";
import { useAddNetworkButtonStyles } from "src/views/shared/add-network-button/add-network-button.styles";

// Permanent header button that offers the wallet's own add-network flow.
// MetaMask is the source of truth: adding an already-present chain is a no-op
// switch, so the button can safely stay visible on every screen.
export const AddNetworkButton = () => {
  const classes = useAddNetworkButtonStyles();
  const env = useEnvContext();
  const { addNetwork } = useProvidersContext();
  const { openSnackbar } = useUIContext();
  const { notifyError } = useErrorContext();
  const callIfMounted = useCallIfMounted();
  const [isDisabled, setIsDisabled] = useState(false);

  const polygonZkEVMChain = env?.chains[1];
  const label = `Add ${env?.networkName ?? polygonZkEVMChain?.name ?? "network"}`;

  const successMsg: Message = useMemo(
    () => ({
      text: `${env?.networkName ?? "The"} network is available in your wallet`,
      type: "success-msg",
    }),
    [env?.networkName]
  );

  if (!env || !polygonZkEVMChain) {
    return null;
  }

  const onAddNetwork = (): void => {
    setIsDisabled(true);
    addNetwork(polygonZkEVMChain)
      .then(() => {
        callIfMounted(() => {
          openSnackbar(successMsg);
        });
      })
      .catch((error) => {
        callIfMounted(() => {
          void parseError(error).then((parsed) => {
            if (parsed === "wrong-network") {
              openSnackbar(successMsg);
            } else if (isMetaMaskUserRejectedRequestError(error) === false) {
              notifyError(error);
            }
          });
        });
      })
      .finally(() => {
        callIfMounted(() => {
          setIsDisabled(false);
        });
      });
  };

  return (
    <button className={classes.button} disabled={isDisabled} onClick={onAddNetwork}>
      <MetaMaskIcon className={classes.icon} />
      {label}
    </button>
  );
};

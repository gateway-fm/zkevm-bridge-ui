import copy from "copy-to-clipboard";
import { FC, useState } from "react";

import { requestFaucetFunds } from "src/adapters/faucet-api";
import CopyIcon from "src/assets/icons/copy.svg?react";
import { brand } from "src/brands";
import { useEnvContext } from "src/contexts/env.context";
import { useUIContext } from "src/contexts/ui.context";
import { useFaucetStyles } from "src/views/faucet/faucet.styles";
import { Button } from "src/views/shared/button/button.view";
import { Typography } from "src/views/shared/typography/typography.view";

type RequestStatus = "error" | "idle" | "loading" | "success";

const isValidAddress = (value: string): boolean => /^0x[a-fA-F0-9]{40}$/.test(value.trim());

const readEnv = (key: string): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

export const FaucetRedesign: FC = () => {
  const classes = useFaucetStyles();
  const env = useEnvContext();
  const { openSnackbar } = useUIContext();
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");

  if (!env) {
    return null;
  }

  const LogoMark = brand.assets.LogoMark;
  const tokenSymbol = brand.faucet.tokenSymbol;
  const networkName = env.networkName ?? "Devnet";
  const logoPath = env.logoPath;
  const apiUrl = readEnv("VITE_FAUCET_API_URL") ?? brand.faucet.apiUrl;
  const servingFrom = readEnv("VITE_FAUCET_SERVING_ADDRESS");
  const supportUrl = brand.faucet.supportUrl;

  const canRequest = apiUrl.length > 0 && isValidAddress(address) && status !== "loading";

  const onCopyServingAddress = () => {
    if (servingFrom) {
      copy(servingFrom);
      openSnackbar({ text: "Address copied to clipboard", type: "success-msg" });
    }
  };

  const onRequest = () => {
    if (!canRequest) {
      return;
    }
    setStatus("loading");
    requestFaucetFunds({ address: address.trim(), apiUrl })
      .then(() => {
        setStatus("success");
        openSnackbar({ text: `${tokenSymbol} request submitted.`, type: "success-msg" });
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <div className={classes.faucet}>
      <div className={classes.contentWrapper}>
        <span className={classes.badge}>
          <span className={classes.badgeDot} /> {networkName}
        </span>
        {logoPath ? (
          <img alt={networkName} className={classes.mark} src={logoPath} />
        ) : (
          <LogoMark className={classes.mark} />
        )}
        <Typography className={classes.heading} type="h1">
          <span className={classes.headingAccent}>Receive</span> 1 {tokenSymbol}
        </Typography>

        <div className={classes.card}>
          {servingFrom && (
            <div className={classes.servingRow}>
              <span className={classes.fieldLabel}>Serving from</span>
              <span className={classes.servingValue}>
                <span className={classes.servingAddress}>{servingFrom}</span>
                <button
                  aria-label="Copy serving address"
                  className={classes.copyButton}
                  onClick={onCopyServingAddress}
                >
                  <CopyIcon className={classes.copyIcon} />
                </button>
              </span>
            </div>
          )}

          <input
            className={classes.addressInput}
            onChange={(event) => {
              setAddress(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
            }}
            placeholder="Enter your address"
            spellCheck={false}
            value={address}
          />

          <div className={classes.buttonWrap}>
            <Button
              disabled={!canRequest}
              isLoading={status === "loading"}
              onClick={onRequest}
            >
              Request
            </Button>
          </div>

          {status === "success" && (
            <p className={classes.requestSuccess}>
              Request submitted. Test tokens will arrive shortly.
            </p>
          )}
          {status === "error" && (
            <p className={classes.requestError}>Request failed. Please try again.</p>
          )}

          <p className={classes.helperText}>
            Claim 1 {tokenSymbol} test token for development.
            <br />
            {supportUrl ? (
              <>
                If you need additional tokens for extensive testing, please{" "}
                <a
                  className={classes.helperLink}
                  href={supportUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  contact support
                </a>
                .
              </>
            ) : (
              "If you need additional tokens for extensive testing, please contact support."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

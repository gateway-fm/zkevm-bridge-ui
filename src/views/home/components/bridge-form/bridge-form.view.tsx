import { BigNumber } from "ethers";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { addCustomToken, getChainCustomTokens, removeCustomToken } from "src/adapters/storage";
import ArrowDown from "src/assets/icons/arrow-down.svg?react";
import CaretDown from "src/assets/icons/caret-down.svg?react";
import { getGasToken } from "src/constants";
import { useEnvContext } from "src/contexts/env.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useTokensContext } from "src/contexts/tokens.context";
import { AsyncTask, Chain, FormData, Token } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { isTokenEther, isWETH, selectTokenAddress } from "src/utils/tokens";
import { isAsyncTaskDataAvailable } from "src/utils/types";
import { AmountInput } from "src/views/home/components/amount-input/amount-input.view";
import { useBridgeFormStyles } from "src/views/home/components/bridge-form/bridge-form.styles";
import { TokenSelector } from "src/views/home/components/token-selector/token-selector.view";
import { Button } from "src/views/shared/button/button.view";
import { Card } from "src/views/shared/card/card.view";
import { ChainList } from "src/views/shared/chain-list/chain-list.view";
import { ErrorMessage } from "src/views/shared/error-message/error-message.view";
// import { Icon } from "src/views/shared/icon/icon.view";
import { Spinner } from "src/views/shared/spinner/spinner.view";
import { TokenBalance } from "src/views/shared/token-balance/token-balance.view";
import { Typography } from "src/views/shared/typography/typography.view";

type BridgeFormProps = {
  account: string;
  formData?: FormData;
  onResetForm: () => void;
  onSubmit: (formData: FormData) => void;
};

type SelectedChains = {
  from: Chain;
  to: Chain;
};

export const BridgeForm: FC<BridgeFormProps> = ({ account, formData, onResetForm, onSubmit }) => {
  const classes = useBridgeFormStyles();
  const callIfMounted = useCallIfMounted();
  const env = useEnvContext();
  const { getErc20TokenBalance, tokens: defaultTokens } = useTokensContext();
  const { connectedProvider } = useProvidersContext();
  const [balanceFrom, setBalanceFrom] = useState<AsyncTask<BigNumber, string>>({
    status: "pending",
  });
  const [balanceTo, setBalanceTo] = useState<AsyncTask<BigNumber, string>>({ status: "pending" });
  const [inputError, setInputError] = useState<string>();
  const [selectedChains, setSelectedChains] = useState<SelectedChains>();
  const [token, setToken] = useState<Token>();
  const [amount, setAmount] = useState<BigNumber>();
  const [chains, setChains] = useState<Chain[]>();
  const [tokens, setTokens] = useState<Token[]>();
  const [isTokenListOpen, setIsTokenListOpen] = useState(false);

  const onAmountInputChange = ({ amount, error }: { amount?: BigNumber; error?: string }) => {
    setAmount(amount);
    setInputError(error);
  };

  const onChainButtonClick = (from: Chain) => {
    if (env) {
      const to = env.chains.find((chain) => chain.key !== from.key);

      if (to) {
        setSelectedChains({ from, to });
        setChains(undefined);
        setAmount(undefined);
      }
    }
  };

  const onTokenDropdownClick = () => {
    setIsTokenListOpen(true);
  };

  const onSelectToken = (token: Token) => {
    setToken(token);
    setIsTokenListOpen(false);
    setAmount(undefined);
  };

  const onCloseTokenSelector = () => {
    setIsTokenListOpen(false);
  };

  const onAddToken = (token: Token) => {
    if (tokens) {
      // We don't want to store the balance of the user in the local storage
      const { address, chainId, decimals, logoURI, name, symbol, wrappedToken } = token;

      addCustomToken({ address, chainId, decimals, logoURI, name, symbol, wrappedToken });
      setTokens([token, ...tokens]);
    }
  };

  const onRemoveToken = (tokenToRemove: Token) => {
    if (tokens) {
      removeCustomToken(tokenToRemove);
      setTokens(
        tokens.filter(
          (token) =>
            !(token.address === tokenToRemove.address && token.chainId === tokenToRemove.chainId)
        )
      );
      if (selectedChains && tokenToRemove.address === token?.address) {
        setToken(getGasToken(selectedChains.from));
      }
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChains && token && amount) {
      onSubmit({
        amount: amount,
        from: selectedChains.from,
        to: selectedChains.to,
        token: token,
      });
    }
  };

  const getTokenBalance = useCallback(
    (token: Token, chain: Chain): Promise<BigNumber> => {
      if (isTokenEther(token, chain)) {
        return chain.provider.getBalance(account);
      } else {
        return getErc20TokenBalance({
          accountAddress: account,
          chain: chain,
          tokenAddress: selectTokenAddress(token, chain),
        });
      }
    },
    [account, getErc20TokenBalance]
  );

  const balanceFetchId = useRef(0);

  useEffect(() => {
    // Load all the tokens for the selected chain and fetch their balances
    if (selectedChains && defaultTokens) {
      const { from } = selectedChains;
      const chainTokens = [...defaultTokens, ...getChainCustomTokens(from)];
      const fetchId = ++balanceFetchId.current;

      // Set tokens to loading and fire all balance fetches in the same tick
      // (JsonRpcBatchProvider batches these into a single HTTP request)
      setTokens(
        chainTokens.map((token) => ({
          ...token,
          balance: { status: "loading" },
        }))
      );

      const balancePromises = chainTokens.map((token) =>
        getTokenBalance(token, from)
          .then((balance) => ({ balance, error: null }))
          .catch(() => ({ balance: null, error: "Couldn't retrieve token balance" }))
      );

      void Promise.all(balancePromises).then((results) => {
        if (fetchId !== balanceFetchId.current) {
          return;
        }
        callIfMounted(() => {
          setTokens(
            chainTokens.map((token, i) => {
              const balance = results[i].balance;
              return {
                ...token,
                balance: balance
                  ? { data: balance, status: "successful" as const }
                  : { error: results[i].error ?? "Unknown error", status: "failed" as const },
              };
            })
          );
        });
      });
    }
  }, [account, callIfMounted, defaultTokens, getTokenBalance, selectedChains]);

  useEffect(() => {
    // Sync "from" balance from the already-fetched tokens list
    if (token) {
      const cachedToken = tokens?.find(
        (tkn) => tkn.address === token.address && tkn.chainId === token.chainId
      );
      if (cachedToken?.balance?.status === "successful" && cachedToken.balance.data) {
        setBalanceFrom({ data: cachedToken.balance.data, status: "successful" });
      } else if (cachedToken?.balance?.status === "failed") {
        setBalanceFrom({ error: "Couldn't retrieve token balance", status: "failed" });
      } else {
        setBalanceFrom({ status: "loading" });
      }
    }
  }, [token, tokens]);

  useEffect(() => {
    // Only fetch the "to" chain balance (from balance comes from the bulk token fetch above)
    if (selectedChains && token) {
      setBalanceTo({ status: "loading" });
      getTokenBalance(token, selectedChains.to)
        .then((balance) =>
          callIfMounted(() => {
            setBalanceTo({ data: balance, status: "successful" });
          })
        )
        .catch(() => {
          callIfMounted(() => {
            setBalanceTo({ error: "Couldn't retrieve token balance", status: "failed" });
          });
        });
    }
  }, [callIfMounted, getTokenBalance, selectedChains, token]);

  useEffect(() => {
    // Load the default values after the network is changed
    if (env && connectedProvider.status === "successful" && formData === undefined) {
      const from = env.chains.find((chain) => chain.chainId === connectedProvider.data.chainId);
      const to = env.chains.find((chain) => chain.chainId !== connectedProvider.data.chainId);

      if (from && to) {
        setSelectedChains({ from, to });
        setToken(getGasToken(from.key === "ethereum" ? to : from));
      }
      setAmount(undefined);
    }
    // This prevents the form from being reset when coming back from BridgeConfirmation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedProvider, env]);

  useEffect(() => {
    // Load default form values
    if (formData) {
      setSelectedChains({ from: formData.from, to: formData.to });
      setToken(formData.token);
      setAmount(formData.amount);
      onResetForm();
    }
  }, [formData, onResetForm]);

  if (!env || !selectedChains || !tokens || !token) {
    return (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    );
  }

  const symbol = isWETH(token, selectedChains.from.key) ? "WETH" : token.symbol;
  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.leftBox}>
            <Typography type="body2">From</Typography>
            <button
              className={classes.fromChain}
              onClick={() => setChains(env.chains)}
              type="button"
            >
              <selectedChains.from.Icon />
              <Typography type="body1">{selectedChains.from.name}</Typography>
              <CaretDown />
            </button>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
            <TokenBalance
              chainId={selectedChains.from.key}
              spinnerSize={14}
              token={{ ...token, balance: balanceFrom }}
              typographyProps={{ type: "body1" }}
            />
          </div>
        </div>
        <div className={`${classes.row} ${classes.middleRow}`}>
          <button className={classes.tokenSelector} onClick={onTokenDropdownClick} type="button">
            <Typography type="h2">{symbol}</Typography>
            <CaretDown />
          </button>
          <AmountInput
            balance={
              balanceFrom && isAsyncTaskDataAvailable(balanceFrom)
                ? balanceFrom.data
                : BigNumber.from(0)
            }
            onChange={onAmountInputChange}
            token={token}
            value={amount}
          />
        </div>
      </Card>
      <div className={classes.arrowRow}>
        <ArrowDown className={classes.arrowDownIcon} />
      </div>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.leftBox}>
            <Typography type="body2">To</Typography>
            <div className={classes.toChain}>
              <selectedChains.to.Icon />
              <Typography type="body1">{selectedChains.to.name}</Typography>
            </div>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
            <TokenBalance
              chainId={selectedChains.to.key}
              spinnerSize={14}
              token={{ ...token, balance: balanceTo }}
              typographyProps={{ type: "body1" }}
            />
          </div>
        </div>
      </Card>
      <div className={classes.button}>
        <Button disabled={!amount || amount.isZero() || inputError !== undefined} type="submit">
          Continue
        </Button>
        {amount && inputError && <ErrorMessage error={inputError} />}
      </div>
      {chains && (
        <ChainList
          chains={chains}
          onClick={onChainButtonClick}
          onClose={() => setChains(undefined)}
        />
      )}
      {isTokenListOpen && (
        <TokenSelector
          account={account}
          chains={selectedChains}
          onAddToken={onAddToken}
          onClose={onCloseTokenSelector}
          onRemoveToken={onRemoveToken}
          onSelectToken={onSelectToken}
          tokens={tokens}
        />
      )}
    </form>
  );
};

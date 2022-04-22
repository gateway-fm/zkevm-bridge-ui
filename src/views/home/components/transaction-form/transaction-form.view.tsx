import { FC, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { ReactComponent as ArrowDown } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CaretDown } from "src/assets/icons/caret-down.svg";
import useTransactionFormtStyles from "src/views/home/components/transaction-form/transaction-form.styles";
import Typography from "src/views/shared/typography/typography.view";
import Card from "src/views/shared/card/card.view";
import Error from "src/views/shared/error/error.view";
import Icon from "src/views/shared/icon/icon.view";
import List from "src/views/home/components/list/list.view";
import Button from "src/views/shared/button/button.view";
import AmountInput from "src/views/home/components/amount-input/amount-input.view";
import { Chain, TransactionData, NetworkData } from "src/domain";
import { useEnvContext } from "src/contexts/env.context";

interface TransactionFormProps {
  onSubmit: (transactionData: TransactionData) => void;
  networks?: NetworkData[];
  transaction?: TransactionData;
}

const TransactionForm: FC<TransactionFormProps> = ({ onSubmit, networks, transaction }) => {
  const classes = useTransactionFormtStyles();
  const env = useEnvContext();
  const [list, setList] = useState<List>();
  const [error, setError] = useState<string>();
  const [transactionData, setTransactionData] = useState<TransactionData | undefined>(transaction);

  // const onChainToButtonClick = (to: Chain) => {
  //   if (transactionData) {
  //     setTransactionData({ ...transactionData, to });
  //     setList(undefined);
  //   }
  // };

  // const onTokenClick = (token: Token) => {
  //   if (transactionData) {
  //     setTransactionData({ ...transactionData, token });
  //     setList(undefined);
  //   }
  // };

  const onChainFromButtonClick = (from: Chain) => {
    if (env && transactionData) {
      const to = env.chains.find((chain) => chain.chainId !== from.chainId);

      if (to) {
        setTransactionData({ ...transactionData, from, to });
        setList(undefined);
      }
    }
  };

  const onInputChange = ({ amount, error }: { amount?: BigNumber; error?: string }) => {
    if (transactionData && amount) {
      setTransactionData({ ...transactionData, amount });
      setError(error);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionData) {
      onSubmit(transactionData);
    }
  };

  const getBalance = (chain: Chain) => {
    const balance = networks?.find((network) => network.chainId === chain.chainId);
    return balance ? balance.balance : BigNumber.from(0);
  };

  useEffect(() => {
    if (env && !transaction) {
      setTransactionData({
        from: env.chains[0],
        to: env.chains[1],
        token: env.tokens.ETH,
        amount: BigNumber.from(0),
      });
    }
  }, [env, transaction]);

  if (!env || !transactionData) {
    return null;
  }

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.box}>
            <Typography type="body2">From</Typography>
            <button
              className={`${classes.chainSelector} ${classes.chainSelectorButton}`}
              onClick={() =>
                setList({ type: "chain", items: env.chains, onClick: onChainFromButtonClick })
              }
              type="button"
            >
              <transactionData.from.Icon />
              <Typography type="body1">{transactionData.from.name}</Typography>
              <CaretDown />
            </button>
          </div>
          <div className={`${classes.box} ${classes.alignRight}`}>
            <Typography type="body2">Balance</Typography>
            <Typography type="body1">
              {ethers.utils.formatEther(getBalance(transactionData.from))} ETH
            </Typography>
          </div>
        </div>
        <div className={`${classes.row} ${classes.middleRow}`}>
          <div
            className={classes.tokenSelector}
            // onClick={() => setList({ type: "token", items: tokens, onClick: onTokenClick })}
          >
            <Icon url={transactionData.token.logoURI} size={24} />
            <Typography type="h2">{transactionData.token.symbol}</Typography>
            {/* <CaretDown className={classes.icons} /> */}
          </div>
          <AmountInput
            value={transactionData.amount}
            token={transactionData.token}
            balance={getBalance(transactionData.from)}
            fee={BigNumber.from(parseUnits("0.0001", transactionData.token.decimals))}
            onChange={onInputChange}
          />
        </div>
      </Card>
      <div className={classes.arrowRow}>
        <div className={classes.arrowDownIcon}>
          <ArrowDown />
        </div>
      </div>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.box}>
            <Typography type="body2">To</Typography>
            <div
              className={classes.chainSelector}
              // onClick={() =>
              //   setList({ type: "chain", items: env.chains, onClick: onChainToButtonClick })
              // }
            >
              <transactionData.to.Icon />
              <Typography type="body1">{transactionData.to.name}</Typography>
              {/* <CaretDown /> */}
            </div>
          </div>
          <div className={`${classes.box} ${classes.alignRight}`}>
            <Typography type="body2">Balance</Typography>
            <Typography type="body1">
              {ethers.utils.formatEther(getBalance(transactionData.to))} ETH
            </Typography>
          </div>
        </div>
      </Card>
      <div className={classes.button}>
        <Button
          type="submit"
          disabled={
            !transactionData.amount || transactionData.amount.isZero() || error !== undefined
          }
        >
          Continue
        </Button>
        {transactionData.amount && error && <Error error={error} />}
      </div>
      {list && (
        <List
          placeholder={list.type === "chain" ? "Search network" : "Search token"}
          list={list}
          onClose={() => setList(undefined)}
        />
      )}
    </form>
  );
};

export default TransactionForm;

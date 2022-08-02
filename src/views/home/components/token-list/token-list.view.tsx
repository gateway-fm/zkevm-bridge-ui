import { FC, MouseEvent, useEffect, useState, useRef } from "react";

import useListStyles from "src/views/home/components/token-list/token-list.styles";
import TokenDetails from "src/views/home/components/token-details/token-details.view";
import Card from "src/views/shared/card/card.view";
import Typography from "src/views/shared/typography/typography.view";
import Icon from "src/views/shared/icon/icon.view";
import Portal from "src/views/shared/portal/portal.view";
import Error from "src/views/shared/error/error.view";
import { isChainCustomToken } from "src/adapters/storage";
import { AsyncTask } from "src/utils/types";
import { formatTokenAmount } from "src/utils/amounts";
import { ReactComponent as XMarkIcon } from "src/assets/icons/xmark.svg";
import { ReactComponent as MagnifyingGlassIcon } from "src/assets/icons/magnifying-glass.svg";
import { ReactComponent as WarningIcon } from "src/assets/icons/warning.svg";
import { Token, Chain } from "src/domain";
import { useBridgeContext } from "src/contexts/bridge.context";

type Screen =
  | {
      type: "token-list";
    }
  | {
      type: "add-token";
      token: Token;
    }
  | {
      type: "token-details";
      token: Token;
    };

interface TokenListProps {
  chain: Chain;
  customToken: AsyncTask<Token, string>;
  error: string | undefined;
  searchInputValue: string;
  tokens: Token[];
  onClose: () => void;
  onImportTokenClick: (token: Token) => void;
  onRemoveTokenClick: (token: Token) => void;
  onSearchInputValueChange: (value: string) => void;
  onSelectToken: (token: Token) => void;
}

const TokenList: FC<TokenListProps> = ({
  chain,
  customToken,
  error,
  searchInputValue,
  tokens,
  onClose,
  onImportTokenClick,
  onSearchInputValueChange,
  onSelectToken,
}) => {
  const classes = useListStyles();
  const { addWrappedToken } = useBridgeContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [screen, setScreen] = useState<Screen>({
    type: "token-list",
  });

  const onOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const isLoading = customToken.status === "loading";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  switch (screen.type) {
    case "token-list": {
      return (
        <Portal>
          <div className={classes.background} onMouseDown={onOutsideClick}>
            <Card className={classes.card}>
              <div className={classes.header}>
                <Typography type="h2">Select token</Typography>
                <button className={classes.closeButton} onClick={onClose}>
                  <XMarkIcon className={classes.closeButtonIcon} />
                </button>
              </div>
              <div className={classes.searchInputContainer}>
                <MagnifyingGlassIcon className={classes.searchIcon} />
                <input
                  ref={inputRef}
                  placeholder="Enter token name or address"
                  type="search"
                  className={classes.searchInput}
                  value={searchInputValue}
                  onChange={(event) => {
                    onSearchInputValueChange(event.target.value);
                  }}
                />
                {searchInputValue !== "" && (
                  <button
                    className={classes.clearSearchButton}
                    onClick={() => onSearchInputValueChange("")}
                  >
                    <XMarkIcon className={classes.clearSearchButtonIcon} />
                  </button>
                )}
              </div>
              <div className={classes.list}>
                {isLoading ? (
                  <Typography className={classes.loading} type="body1">
                    Loading...
                  </Typography>
                ) : error ? (
                  <Error error={error} type="body2" className={classes.error} />
                ) : (
                  tokens.map((token) => {
                    const isImportedCustomToken = isChainCustomToken(token, chain);
                    const isNonImportedCustomToken =
                      !isImportedCustomToken &&
                      customToken.status === "successful" &&
                      customToken.data.address === token.address;
                    return (
                      <div key={token.address} className={classes.tokenButtonWrapper}>
                        <button
                          role="button"
                          className={classes.tokenButton}
                          onClick={() => onSelectToken(token)}
                        >
                          <div className={classes.tokenInfo}>
                            <Icon url={token.logoURI} size={24} className={classes.tokenIcon} />
                            <Typography type="body1">{token.name}</Typography>
                          </div>
                        </button>

                        {isNonImportedCustomToken ? (
                          <button
                            className={classes.addTokenButton}
                            onClick={() => {
                              addWrappedToken({ token })
                                .then((newToken) => {
                                  setScreen({
                                    type: "add-token",
                                    token: newToken,
                                  });
                                })
                                .catch(() => {
                                  setScreen({
                                    type: "add-token",
                                    token,
                                  });
                                });
                            }}
                          >
                            <Typography type="body1">Add token</Typography>
                          </button>
                        ) : (
                          <Typography type="body2" className={classes.tokenBalance}>
                            {`${token.balance ? formatTokenAmount(token.balance, token) : "--"} ${
                              token.symbol
                            }`}
                          </Typography>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </Portal>
      );
    }
    case "add-token": {
      return (
        <Portal>
          <div className={classes.background} onMouseDown={onOutsideClick}>
            <Card className={classes.card}>
              <div className={classes.header}>
                <Typography type="h2">Add token</Typography>
                <button className={classes.closeButton} onClick={onClose}>
                  <XMarkIcon className={classes.closeButtonIcon} />
                </button>
              </div>
              <div className={classes.disclaimerBox}>
                <WarningIcon className={classes.disclaimerBoxWarningIcon} />
                <Typography type="body1" className={classes.disclaimerBoxMessage}>
                  Interact carefully with any new or suspicious token
                </Typography>
              </div>
              <TokenDetails token={screen.token} className={classes.tokenDetails} />
              <button
                className={classes.finalAddTokenButton}
                onClick={() => {
                  onImportTokenClick(screen.token);
                  setScreen({
                    type: "token-list",
                  });
                }}
              >
                Add {screen.token.name}
              </button>
            </Card>
          </div>
        </Portal>
      );
    }
    case "token-details": {
      return (
        <Portal>
          <div className={classes.background} onMouseDown={onOutsideClick}>
            <Card className={classes.card}>
              <div className={classes.header}>
                <Typography type="h2">Token details</Typography>
                <button className={classes.closeButton} onClick={onClose}>
                  <XMarkIcon className={classes.closeButtonIcon} />
                </button>
              </div>
            </Card>
          </div>
        </Portal>
      );
    }
  }
};

export default TokenList;

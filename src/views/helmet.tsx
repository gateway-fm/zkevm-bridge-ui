import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEnvContext } from "../contexts/env.context";

export const AppHead = () => {
  const env = useEnvContext();

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta
          content="Simple user interface to bridge ETH and your favorite ERC-20 tokens from Ethereum to the Polygon zkEVM and back"
          name="description"
        />
        {env?.faviconPath && (
          <link href={env.faviconPath} rel="icon" type="image/svg+xml" />
        )}
        <link href="/logo192.png" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />
        {env?.networkName && (
          <title>{env.networkName} Bridge</title>
        )}
      </Helmet>
    </HelmetProvider>
  );
};

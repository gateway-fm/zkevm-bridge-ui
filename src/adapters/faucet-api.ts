import axios from "axios";

// Minimal client for a brand's devnet faucet. The endpoint funds `address` with
// a fixed amount of the test token. The concrete request/response shape is
// backend-specific; adjust once the TEIZA faucet API contract is confirmed.
export const requestFaucetFunds = async (params: {
  address: string;
  apiUrl: string;
}): Promise<void> => {
  await axios.post(params.apiUrl, { address: params.address });
};

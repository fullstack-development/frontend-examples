import type { Address } from "viem";

export const contractAddress: Record<string, Address> = {
  Sepolia: import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA,
  Mainnet: import.meta.env.VITE_CONTRACT_ADDRESS_MAINNET,
};

export const explorerTxUrl: Record<string, string> = {
  Sepolia: "https://sepolia.etherscan.io/tx/",
  Mainnet: "https://etherscan.io/tx/",
};

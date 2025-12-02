import type { FC, PropsWithChildren } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID, // for WalletConnect - https://rainbowkit.com/docs/installation#configure
  chains: [mainnet, sepolia],
  // Don't use public rpc providers in production (if possible in development too)!
  // https://rainbowkit.com/docs/installation#preparing-to-deploy
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_ETHEREUM_RPC_URL),
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC_URL),
  },
  // ssr: true, Check wagmi SSR guide - https://wagmi.sh/react/guides/ssr
});

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={sepolia}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

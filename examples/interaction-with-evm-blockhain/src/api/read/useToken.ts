import { type Address,erc20Abi, formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

export const useToken = (tokenAddress?: Address) => {
  const { address: accountAddress } = useAccount();
  const result = useReadContracts(
    tokenAddress &&
      accountAddress && {
        allowFailure: false,
        contracts: [
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "name",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "symbol",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "totalSupply",
          },
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [accountAddress],
          },
        ],
      }
  );

  return {
    ...result,
    data: result.data
      ? {
          decimals: result.data[0],
          name: result.data[1],
          symbol: result.data[2],
          totalSupply: result.data[3],
          balanceOf: result.data[4],
          formattedBalance: formatUnits(result.data[4], result.data[0]),
        }
      : undefined,
  };
};

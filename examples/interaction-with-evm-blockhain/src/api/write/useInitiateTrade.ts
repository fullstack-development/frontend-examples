import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { TRUSTLESS_OTC_ABI } from "../../abi/TrustlessOTC";
import { contractAddress, explorerTxUrl } from "../../constants";

export const useInitiateTrade = () => {
  const { chain } = useAccount();
  const { data: txHash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const initiateTrade = () => {
    writeContract({
      address: contractAddress[chain?.name || "Sepolia"],
      abi: TRUSTLESS_OTC_ABI,
      functionName: "initiateTrade",
      args: [
        "0x820CD06B058dcc48a61f44CE58E03C561DdfDCA9",
        "0x1F05b02B94de421820d090F6E9FAa0bdBECdb1B8",
        1000000n,
        500000n,
        "0x0000000000000000000000000000000000000000",
      ],
    });
  };

  return {
    initiateTrade,
    isPending,
    isConfirming,
    isConfirmed,
    txHash,
    txExplorerUrl: txHash
      ? `${explorerTxUrl[chain?.name || "Sepolia"]}${txHash}`
      : undefined,
  };
};

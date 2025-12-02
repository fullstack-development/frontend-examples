import { useAccount, useReadContract } from "wagmi";

import { TRUSTLESS_OTC_ABI } from "../../abi/TrustlessOTC";
import { contractAddress } from "../../constants";

export const useGetOfferDetails = (offerId: bigint) => {
  const { chain } = useAccount();
  const result = useReadContract({
    address: contractAddress[chain?.name || "sepolia"],
    abi: TRUSTLESS_OTC_ABI,
    functionName: "getOfferDetails",
    args: [offerId],
  });

  return {
    ...result,
    data: result.data ? {
      tokenFrom: result.data[0],
      tokenTo: result.data[1],
      amountFrom: result.data[2],
      amountTo: result.data[3],
      creator: result.data[4],
      fee: result.data[5],
      active: result.data[6],
      completed: result.data[7],
    } : undefined,
  };
};

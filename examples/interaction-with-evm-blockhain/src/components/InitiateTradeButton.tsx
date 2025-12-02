import type { FC } from "react";

import { useInitiateTrade } from "../api/write/useInitiateTrade";

export const InitiateTradeButton: FC = () => {
  const {
    initiateTrade,
    isPending,
    isConfirming,
    isConfirmed,
    txHash,
    txExplorerUrl,
  } = useInitiateTrade();

  const handleButtonClick = () => {
    initiateTrade();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isPending || isConfirming}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Initiate Trade
      </button>
      {isPending && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
          Transaction is pending...
        </div>
      )}
      {txHash && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
          <p className="text-sm font-medium mb-1">Transaction Hash:</p>
          <p className="text-xs text-gray-600 break-all">{txHash}</p>
        </div>
      )}
      {isConfirming && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
          Waiting for confirmation...
        </div>
      )}
      {isConfirmed && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
          Transaction confirmed.
        </div>
      )}
      {txExplorerUrl && (
        <a
          href={txExplorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline text-sm"
        >
          View Transaction on Explorer
        </a>
      )}
    </div>
  );
};

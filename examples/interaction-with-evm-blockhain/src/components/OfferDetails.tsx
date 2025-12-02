import { type FC, useState } from "react";
import { formatUnits } from "viem";

import { useGetOfferDetails } from "../api/read/useGetOfferDetails";
import { useToken } from "../api/read/useToken";

export const OfferDetails: FC = () => {
  const [offerId, setOfferId] = useState(0);

  const { data } = useGetOfferDetails(BigInt(offerId));
  const { data: tokenFromData } = useToken(data?.tokenFrom);
  const { data: tokenToData } = useToken(data?.tokenTo);

  const amountFrom = formatUnits(
    data?.amountFrom || 0n,
    tokenFromData?.decimals || 0
  );
  const amountTo = formatUnits(
    data?.amountTo || 0n,
    tokenToData?.decimals || 0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Offer Details</h2>
      <label className="flex items-center gap-2 mb-6">
        <span className="font-medium">Offer ID:</span>
        <input
          type="number"
          min={0}
          max={100}
          value={offerId}
          onChange={(e) => setOfferId(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Token from:</span>{" "}
            <span className="text-gray-600 break-all">{data?.tokenFrom}</span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Token to:</span>{" "}
            <span className="text-gray-600 break-all">{data?.tokenTo}</span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Amount from:</span>{" "}
            <span className="text-gray-600">{amountFrom}</span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Amount to:</span>{" "}
            <span className="text-gray-600">{amountTo}</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Creator:</span>{" "}
            <span className="text-gray-600 break-all">{data?.creator}</span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Fee:</span>{" "}
            <span className="text-gray-600">{data?.fee}</span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Active:</span>{" "}
            <span className={data?.active ? "text-green-600" : "text-red-600"}>
              {data?.active ? "Yes" : "No"}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-medium">Completed:</span>{" "}
            <span className={data?.completed ? "text-green-600" : "text-gray-600"}>
              {data?.completed ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

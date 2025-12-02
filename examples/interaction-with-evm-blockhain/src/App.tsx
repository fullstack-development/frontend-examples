import { ConnectButton } from "./components/ConnectButton";
import { InitiateTradeButton } from "./components/InitiateTradeButton";
import { OfferDetails } from "./components/OfferDetails";
import { Providers } from "./Providers";

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="flex justify-end">
            <ConnectButton />
          </div>
          <OfferDetails />
          <InitiateTradeButton />
        </div>
      </div>
    </Providers>
  );
}
export default App;

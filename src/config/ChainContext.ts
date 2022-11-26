import { ChainId } from "@thirdweb-dev/sdk";
import { createContext } from "react";

// https://blog.thirdweb.com/guides/how-to-support-multiple-chains-in-your-dapp/
const ChainContext = createContext({

  selectedChain: ChainId.Mumbai,
  
  setSelectedChain: (chain: ChainId) => {},
});

export default ChainContext;
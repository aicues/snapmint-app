import { ChainId } from "@thirdweb-dev/sdk";
import { inDevEnvironment } from "./inDevEnvironment";

export const targetChainId = inDevEnvironment ? ChainId.Mumbai : ChainId.Polygon;
export const targetChainString = inDevEnvironment ? "mumbai" : "polygon";

/***
 * Need to add support for your own network
 */
export const getEtherscanURL = () => {
  if (targetChainId === ChainId.Polygon) {
    return "https://polygonscan.com/";
  } else if (targetChainId === ChainId.Mumbai) {
    return "https://mumbai.polygonscan.com/";
  }
  else {
    console.log("Please add etherscan URL for your network");
    return undefined;
  }
};
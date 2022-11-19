import { ChainId } from "@thirdweb-dev/sdk";
import { targetChainId } from "./targetChainConfig";

interface IAddresses {
  [key: string]: { [key: string]: string };
}

/***
 * Add your addresses + networks here.
 * To tell your app where to point to, change the targetChainId
 */
const ADDRESSES: IAddresses = {
  [ChainId.Mumbai]: {
    Marketplace: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS as string,
  },
};

export const readAppContractAddresses = (name: string) => {
  return ADDRESSES[targetChainId][name];
};

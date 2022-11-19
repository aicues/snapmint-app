import * as React from "react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, ThirdwebNftMedia, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import Link from "next/link";

export const NftCollection: React.FC<{
  collectionAddress: string;
}> = ({ collectionAddress}) => {

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  // get collection info
  const { contract } = useContract(collectionAddress, "nft-collection");
  const { data: nfts, isLoading } = useNFTs(contract);
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);

  return (
    <div className="bg-base-200 flex flex-col place-items-start space-y-6">
      {!loadingMetadata &&
        <div className="flex place-items-start space-x-6">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={collectionMetadata?.image} alt="NFT Collection Thumbnail" />
                
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{collectionMetadata?.name}</div>
            </div>
        </div>
      }

    <div className="divider"></div>

      {!isLoading ?
      (<div className="flex space-x-12">
        {nfts?.map(e =>
          <div key={e.metadata.id} className="card card-compact w-64 bg-base-100 shadow-lg">
            <figure><ThirdwebNftMedia metadata={e.metadata}/></figure>
            <div className="card-body">
              <h2 className="card-title text-primary">{collectionMetadata?.name}{" "}<span>#{e.metadata.id}</span></h2>
            </div>
            
          </div>
        )}
      </div>)
      : (<p className="loading">Loading...</p>) }
    </div>
  );
};

export default NftCollection;
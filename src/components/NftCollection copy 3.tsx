/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, ThirdwebNftMedia, useContract, useContractMetadata, useNFTs, useNFT} from "@thirdweb-dev/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export const NftCollection: React.FC<{
  collectionAddress: string;
  columns: number;
  displayCTA?: boolean;
}> = ({ collectionAddress, columns, displayCTA}) => {

   // Translations
   const { t }= useTranslation('common');
   
  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  // get collection info
  const { contract } = useContract(collectionAddress, "nft-collection");
  const { data: nfts, isLoading } = useNFTs(contract);
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);

  //how many columns to display in grid for larger screens
  const gridClassName = `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-${columns}`;

  // console.log("columns", columns);
  // console.log("gridClassName", gridClassName);

  return (
    // <div className="bg-base-200 flex flex-col place-items-start w-full">
      <div className="card w-full bg-base-100 shadow-xl p-4">

        {/* Collection metadata */}
        <div className="card-body w-full p-0 pb-4">
          {!loadingMetadata &&
              <div className="flex place-items-start space-x-3">
                  <div className="avatar">
                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={collectionMetadata?.image} alt={collectionMetadata?.name} />
                    </div>
                  </div>
                  <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start lg:flex lg:justify-start">
                      <span className="text-2xl font-bold">{collectionMetadata?.name} / {collectionMetadata?.symbol}</span>
                      {/* <span className="text-2xl font-bold">/{collectionMetadata?.fee_recipient} / {collectionMetadata?.seller_fee_basis_points}</span> */}
                  </div>
              </div>
            }
        </div>

        {/* Collection NFTs */}
        {/* ref: https://daily-dev-tips.com/posts/tailwind-grid-responsive-4-column-blocks/ */}
        <div className="container mx-auto">
          <div className={gridClassName}>
            {!isLoading ?
              (<>
                {nfts?.map(e =>
                  <div key={e.metadata.id} className="card card-compact bg-base-100 shadow-xl">
                  <figure><ThirdwebNftMedia metadata={e.metadata}/></figure>
                  
                  <div className="card-body px-0">
                    <h3 className="card-title text-sm">{e.metadata.name}</h3>
                    <table className="table table-compact">
                      <tbody>
                        <tr>
                          <td className="text-base-content/70 text-xs p-0">Token:</td>
                          <td className="text-base-content text-xs p-0">#{e.metadata.id}</td>
                        </tr>
                        <tr>
                          <td className="text-base-content/70 text-xs  p-0">Owner:</td>
                          <td className="text-accent text-xs p-0">{formatDisplayAddress(e.owner)}</td>
                        </tr>
                        <tr>
                          <td className="text-base-content/70 text-xs  p-0">Supply:</td>
                          <td className="text-base-content text-xs p-0">{e.supply}</td>
                        </tr>
                      </tbody>
                    </table>
                    {/* dummy */}
                    <p> </p>
                    {displayCTA && (
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm">Watch</button>
                      </div>
                    )}
                  </div>
                </div>
                )}
              </>)
              : (<div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>) 
            }
          </div>
        </div>




    {/* <div className="divider"></div> */}

      {/* {!isLoading ?
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
      : (<p className="loading">Loading...</p>) 
      } */}

      </div>
    // </div>
  );
};

export default NftCollection;
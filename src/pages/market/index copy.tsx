import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import {
    MediaRenderer,
    useNetwork,
    useNetworkMismatch,
    useListing,
    useContract,
    useCreateDirectListing,
    useCreateAuctionListing,
    useNFT,
  } from "@thirdweb-dev/react";
import {
    ChainId,
    ListingType,
    AuctionListing,
    DirectListing,
    Marketplace,
    NATIVE_TOKENS,
    TransactionResultWithId,
  } from "@thirdweb-dev/sdk";

import * as React from "react";


import NftCard from "@components/NftCard";
// import NFTInfo from "@components/NFTInfo";
import { formatDisplayAddress, hexToETH } from "@utils/web3utils";
import { useRouter } from "next/router";
import { useActiveListings, useMarketplace } from "@thirdweb-dev/react";
import { readAppContractAddresses } from "@config/contractAddresses";
import { getEtherscanURL } from "@config/targetChainConfig";
import Loader from '@components/Loader';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
    // Add custom props here
}

// const Home: NextPage = () => {
const Home:  NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  const marketplaceAddress = readAppContractAddresses("Marketplace");
  // Initialize the marketplace contract
  const { contract: marketplace } = useContract( marketplaceAddress, "marketplace");
//   const marketplace = useMarketplace(marketplaceAddress);
  const { data, isLoading, error } = useActiveListings(marketplace);

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

//   if (isLoading) {
//     return <div className="large-text">Loading...</div>;
//   } else 
  
  if (data?.length === 0) {
    return <div className="large-text">No Data To Show</div>;
  }






  return (
    <section className="bg-base-200 flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
      {/* <h1 className="mt-6 text-center text-2xl font-normal text-slate-500 hover:font-semibold">
        Listings
      </h1> */}
      {isLoading && <Loader/>}
      <div className="flex flex-wrap justify-center">
        {data?.map((listing: AuctionListing | DirectListing ) => {
          return (
            <>
              <NftCard 
                key={listing.id}
                image={listing.asset?.image ?? ""} 
                id={listing.id}
                description={listing.asset?.description ?? ""}
                title={listing.asset?.name as string?? ""}
                contractAddress={listing.assetContractAddress}
                ownerAddress={listing.sellerAddress} //?
                >
                <>
                  <div
                    id="sell-data"
                    className="flex flex-col  justify-between pt-2 text-sm "
                  >
                    <div className="text-left ">
                      <span className="font-bold">Listing Price: </span>
                      {`${hexToETH(listing.buyoutPrice)} ⧫`}
                    </div>
                    <div className="mt-1 text-left">
                      <span className="font-bold">Seller: </span>
                      <a
                        target="_blank"
                        className="text-blue-700"
                        href={`${etherscanURL}/token/${listing.sellerAddress}`}
                        rel="noreferrer"
                      >
                        {formatDisplayAddress(listing.sellerAddress)}
                      </a>
                    </div>
                  </div>
                  <div
                    id="buy-button "
                    onClick={() => {
                      router.push(`/listing/${listing.id}`);
                    }}
                    className="primary-button mt-2"
                  >
                    View Listing
                  </div>
                </>
              </NftCard>
            </>
          );
        })}
      </div>
    </section>
  );



};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    return {
        props: {
            ...trans,
        },
    }
}
export default Home;

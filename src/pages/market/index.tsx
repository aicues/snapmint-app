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
    ThirdwebNftMedia,
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
import NoDataToShow  from "@components/NoDataToShow";
import { getEtherscanURL } from "@config/targetChainConfig";
import Loader from '@components/Loader';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {Card, Button, Table, Avatar} from "react-daisyui";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

type Props = {
    // Add custom props here
}

// const Home: NextPage = () => {
const Home:  NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  // Translations
  const { t }= useTranslation('common');
  
  // Initialize the marketplace contract
  const marketplaceAddress = readAppContractAddresses("Marketplace");
  const { contract: marketplace } = useContract( marketplaceAddress, "marketplace");

  // Get Active Listings
  const { data, isLoading, error } = useActiveListings(marketplace);

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

//   if (isLoading) {
//     return <div className="large-text">Loading...</div>;
//   } else 
  
  if (data?.length === 0) {
    return <NoDataToShow/>;
  }






  return (
    <><NextSeo
      title='Snapmint | Qafu Qatar'
      description='Qafu Qatar NFT digital collectibles'
      canonical="https://www.snapmint.io/market"
      openGraph={{
        images: [
          {
            url: 'https://www.snapmint.io/og/facebook-og-4.png',
            width: 1200,
            height: 630,
            alt: 'Snapmint'
          }
        ],
      }} />
      <section className="bg-base-200 flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
        <div className="p-4 container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {!isLoading ?
              (
                <>
                  {data?.map((listing: AuctionListing | DirectListing) => {
                    return (
                      <NftCard
                        key={listing.id}
                        image={listing.asset?.image ?? ""}
                        tokenId={listing.asset.id}
                        listingId={listing.id}
                        description={listing.asset?.description ?? ""}
                        title={listing.asset?.name as string ?? ""}
                        contractAddress={listing.assetContractAddress}
                        buyoutPrice={`${hexToETH(listing.buyoutPrice)} ⧫ ${listing.buyoutCurrencyValuePerToken.symbol}`}
                        ownerAddress={listing.sellerAddress} //?
                      >
                        <>
                        </>
                      </NftCard>
                    );
                  })}
                </>
              ) : (
                <div><button className="btn btn-ghost loading btn-lg btn-circle" /><span>{t('fetch.loading')}</span></div>
              )}

          </div>
        </div>
      </section></>
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

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useRouter } from "next/router";
import { epochtoDateString, formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, ThirdwebNftMedia, useContract, useContractMetadata, useNFTs, useNFT, useListings} from "@thirdweb-dev/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {Table} from "react-daisyui";
import { AuctionListing, DirectListing, ListingType } from "@thirdweb-dev/sdk";

export const NftMaketListings: React.FC<{
    contractId: string;
    tokenId: string;
}> = ({ contractId, tokenId}) => {

   // Translations
   const { t }= useTranslation('common');
   
  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace");

  // Get listing for this NFT, ref: https://portal.thirdweb.com/typescript/sdk.marketplacefilter
  const { data: listings, isLoading, error } = useListings(marketplace, { start: 0, count: 100, tokenContract: contractId, tokenId: tokenId });

  console.log(listings);

 

  return (
      <div className="card w-full bg-base-100 ">
        {!isLoading ?
            (<>
            <Table compact={true} zebra={true} className="w-full text-secondary [&>tr>th]:px-0 [&>tr>th]:py-0.5 [&>tr>td]:py-0.5 [&>tr>th>span]:text-base-content text-xs [&>tr>th]:bg-transparent [&>tr>td]:bg-transparent">
                <Table.Head>
                    <span>#</span>
                    <span>Price</span>
                    <span/>
                    {/* <span>Company</span> */}
                </Table.Head>
                <Table.Body>
                    {listings?.map(e =>
                        <Table.Row key={e.id}>
                            <span>{e.id}</span>
                            <span>{e.buyoutCurrencyValuePerToken.displayValue} {" "} {e.buyoutCurrencyValuePerToken.symbol}</span>
                            <span>
                                {
                                    e.type == ListingType.Auction 
                                    ? "Auction ends in " + epochtoDateString((e as AuctionListing).endTimeInEpochSeconds, 'en')
                                    : e.type == ListingType.Direct 
                                    ? "Offer ends in " + epochtoDateString((e as DirectListing).secondsUntilEnd, 'en')
                                    : ""
                                }
                            </span>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            </>)
            : (<div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>) 
        }
      </div>
  );
};

export default NftMaketListings;
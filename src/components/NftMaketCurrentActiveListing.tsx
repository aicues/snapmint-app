/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useRouter } from "next/router";
import { epochtoDateString, isEpochExpired,  isListingExpired, formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, ThirdwebNftMedia, useContract, useContractMetadata, useNFTs, useNFT, useListings, useNetworkMismatch, useNetwork, useAddress, useSDK} from "@thirdweb-dev/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {Button, Table} from "react-daisyui";
import { AuctionListing, ChainId, DirectListing, ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { toast } from "react-toastify";
import { useState } from "react";

export const NftMaketCurrentActiveListing: React.FC<{
    contractId: string;
    tokenId: string;
}> = ({ contractId, tokenId}) => {

    // Translations
    const { t } = useTranslation('common');

    // Hooks to detect user is on the right network and switch them if they are not
    const address = useAddress();
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();
    const etherscanURL = getEtherscanURL();

    const [bidAmount, setBidAmount] = useState("");

    // Initialize the marketplace contract
    const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace");

    // Get listing for this NFT, ref: https://portal.thirdweb.com/typescript/sdk.marketplacefilter
    const { data: listings, isLoading, error } = useListings(marketplace, { start: 0, count: 100, tokenContract: contractId, tokenId: tokenId });

    // console.log("listings:", listings);

    const sdk = useSDK();
    

    if (isLoading) {
        return <div><button className="btn btn-ghost loading btn-sm btn-circle"/><span>{t('fetch.loading')}</span></div>;
    }
    if (!listings || listings.length === 0) {
        return <div>No Data To Show</div>;
    }

    const listing = listings[0];
    const listingExpired = isListingExpired(listing);

    

    // console.log("listing ex:",  isListingExpired(listing));

    

 
    // Buying Functions
    // async function createBidOrOffer() {
    //     try {
    //       // Ensure user is on the correct network
    //       if (networkMismatch) {
    //         switchNetwork && switchNetwork(ChainId.Mumbai);
    //         return;
    //       }
    
      
    //       // If the listing type is a direct listing, then we can create an offer.
    //       if (listing?.type === ListingType.Direct) {
    //         await marketplace?.direct.makeOffer(
    //           listing.id, // The listingId of the listing we want to make an offer for
    //           1, // Quantity = 1
    //           NATIVE_TOKENS[ChainId.Mumbai].wrapped.address, // Wrapped Ether address on Goerli
    //           bidAmount // The offer amount the user entered
    //         );
    //       }
    
    //       // const listings = await marketplace?.getActiveListings();
    //       // const priceOfFirstActiveListing = listings[0]?.price;
    
    //       // If the listing type is an auction listing, then we can create a bid.
    //       if (listing?.type === ListingType.Auction) {
    //         await marketplace?.auction.makeBid(listing.id, bidAmount);
    //       }
    
    //       alert(
    //         `${
    //           listing?.type === ListingType.Auction ? "Bid" : "Offer"
    //         } created successfully!`
    //       );
    //     } catch (error) {
    //       console.error(error);
    //       toast.error(error as string, {
    //         position: toast.POSITION.TOP_CENTER, toastId: "bid-offfer-error"
    //       });
    //     }
    //   }
    
      async function buyNft() {
        try {

          if (!address ) {
            toast.error("Please connect your Wallet!", {
              position: toast.POSITION.TOP_CENTER, toastId: "wallet-error"
            });
            return;
          }
          // Ensure user is on the correct network
          if (networkMismatch) {
            switchNetwork && switchNetwork(ChainId.Mumbai);
            return;
          }


          //Todo: Not working check if we can make it into component or hook ang guid the user where to buy crypto
          await sdk?.wallet.balance().then((balance) => {
            console.log("balance:", balance?.value <= listing.buyoutPrice);
            if(balance.value <= listing.buyoutPrice) {
              toast.error("Insufficient Balance!", {
                position: toast.POSITION.TOP_CENTER, toastId: "wallet-balance-error"
              });
              return;
            } 
          });
          // const balance = await sdk?.wallet.balance();
          // console.log("balance:", balance);
          // console.log("balance:", balance && balance?.value <= listing.buyoutPrice);
          // if(balance && balance.value <= listing.buyoutPrice) {
          //   toast.error("Insufficient Balance!", {
          //     position: toast.POSITION.TOP_CENTER, toastId: "wallet-balance-error"
          //   });
          //   return;
          // } 
          


          setSubmitting(true);
          // Simple one-liner for buying the NFT
          await marketplace?.buyoutListing(listing.id, 1);
          setSubmitting(false);

          toast.success("NFT bought successfully!", {
            position: toast.POSITION.TOP_CENTER, toastId: "buy-success"
          });
          // Redirect to my assets page
          router.push(`/my/assets`);

        } catch (error) {
          // console.error(error);
          setSubmitting(false);
          toast.error(error as string, {
            position: toast.POSITION.TOP_CENTER, toastId: "buy-error"
          });
        }
      }

  return (
    <>
    
        <div className="text-lg font-extrabold">Current price</div>
        <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
            <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}{listing.buyoutCurrencyValuePerToken.symbol}
        </h1>

        <div className="text-sm font-light">
            
            {
              listing.type == ListingType.Auction 
              ? "Auction ends in " + epochtoDateString((listing as AuctionListing).endTimeInEpochSeconds, 'en')
              : listing.type == ListingType.Direct 
              ? "Offer ends in " + epochtoDateString((listing as DirectListing).secondsUntilEnd, 'en')
              : ""
            }
            {"  "} {listingExpired && <span className="badge badge-accent">Expired</span>}
        </div>
        {/* <input
                type="text"
                name="bidAmount"
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
                style={{ marginTop: 0, marginLeft: 0, width: 128 }}
        /> */}
        {/* <!-- btns --> */}
        <div className="mt-4 flex flex-1 place-items-start justify-center space-x-2 lg:justify-start w-full">
              {/* <button onClick={buyNft} disabled={listingExpired}
                  className="btn btn-primary btn-active w-full lg:btn-lg normal-case">
                    <span className="hidden sm:inline">{t('market.buy-now')}</span>
                    <span className="inline sm:hidden">{t('market.buy-now')}</span>
              </button> */}
              <Button type="submit" color={"primary"} fullWidth={true} responsive={true} active={true} animation={true} size={"md"}
                loading={submitting} disabled={submitting}
                onClick={buyNft}
              >
              {t('market.buy-now')}
            </Button>
              {/* <button onClick={createBidOrOffer} 
                className="btn lg:btn-lg normal-case min-w-[50%]">
                {t('market.make-offer')}
              </button> */}
          </div>
    
    
</>
  );
};

export default NftMaketCurrentActiveListing;
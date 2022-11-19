import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import {
  AuctionListing,
  ChainId,
  DirectListing,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import type { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Home.module.css";

import { formatDisplayAddress, hexToETH, epochtoDateString  } from "@utils/web3utils";
import TwoCardsContainer from "@components/TwoCardsContainer";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { unknown } from "zod";

type Props = {
  // Add custom props here

}

const ListingPage: NextPage = (_props: InferGetStaticPropsType<typeof getServerSideProps>) => {

  const { t }= useTranslation('common');
  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace");

  

  // Fetch the listing from the marketplace contract
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );
  console.log(listing);

  
  // console.log("listing", Object.fromEntries(listing as AuctionListing)); 
  //endTimeInEpochSeconds
  // console.log("endTimeInEpochSeconds", JSON.stringify(listing)); 
  // const bla = JSON.stringify(listing,('endTimeInEpochSeconds', 'endTimeInEpochSeconds'));
  // console.log("endTimeInEpochSeconds", JSON.stringify(listing));

   // get collection info
   const { contract: nftCollection } = useContract(listing?.assetContractAddress, "nft-collection" );
   const { data: metaCollection } = useContractMetadata(nftCollection );


  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");

  // const [props,] = useState<{}>(listing?.asset.properties);

  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  if (!listing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

  
      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Mumbai].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }

      // const listings = await marketplace?.getActiveListings();
      // const priceOfFirstActiveListing = listings[0]?.price;

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      alert(
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      alert("NFT bought successfully!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }


  // Todo: we need this fixed to display NFT traits
  // const properties = listing?.asset.properties ;//as MyItem[];
  // const myMap = properties?.map((item: { [x: string]: unknown;} | { [y: string]: unknown;}) => { return { [item.x as string]: item.y } });  
  // console.log("properties", properties);

  // const bbb = listing? listing.type == ListingType.Auction ? listing.endTimeInEpochSeconds : listing.type == ListingType.Direct ? listing.secondsUntilEnd : null;
  // bbb.
  const properties = listing?.asset.properties ;
  const arrayOfProperties = properties? Array.isArray(properties)
    ? properties
    : [properties]
  : undefined;

  // console.log("arrayOfProperties", arrayOfProperties);

  const myMap = arrayOfProperties?.map((item: { [x: string]: unknown;} | { [y: string]: unknown;}) => { 
    return { [item.x as string]: item.y } });

  const vbv = arrayOfProperties?.map((obj, index) => (
    <li key={index}>
      {Object.entries(obj).map(([key, value], index) => (
        
        <p key={index}><> {key}={value}</></p>
        
      ))}
    </li>
  ))

  const vbv2 = arrayOfProperties?.map((obj, index) => (
    <ul key={index}>
      {Object.entries(obj).map(([key, value], index) => (
        
        <li key={index}><> {key}={value}</></li>
        
      ))}
    </ul>
  ))
  // const bla = Object.entries(arrayOfProperties);

  // const myMap = arrayOfProperties?.map(item => {item.x as string; item.x as string});
  // console.log("myMap", myMap);


  return (
    <TwoCardsContainer card1_width="lg:w-1/2" card2_width="lg:w-1/2"

      Card1={
        <div className="card w-full bg-base-100 p-6 shadow-xl place-items-center justify-center">
            <MediaRenderer
                src={listing.asset.image}
                // style={{
                //     // Fit the image to the container
                //     width: "100%",
                //     height: "100%",
                //     borderRadius: 16,
                // }}
                />
        </div>
      }

      Card2={
        <>
        <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
          {metaCollection?.name}{" "}<span>#{listing.asset.id}</span></h1>

        <h2>{listing.asset.name}</h2>
          <p> Owned by{" "}{formatDisplayAddress(listing.sellerAddress)} </p>
          <div className="divider text-base-content/60 m-0">Reports</div>
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
          </div>
          {/* <!-- btns --> */}
          <div className="mt-4 flex flex-1 place-items-start justify-center space-x-2 lg:justify-start w-full">
              <button onClick={buyNft}
                  className="btn btn-primary btn-active lg:btn-lg normal-case min-w-[50%]">
                    <span className="hidden sm:inline">{t('market.buy-now')}</span>
                    <span className="inline sm:hidden">{t('market.buy-now')}</span>
              </button>
              <button onClick={createBidOrOffer} 
                className="btn lg:btn-lg normal-case min-w-[50%]">
                {t('market.make-offer')}
              </button>
          </div>
          {/* <input type="number" name="price"
                min="0.05" max="10" step="0.05" value={price}
                className="input w-full"
                onChange={(e) => setPrice(Number(e.target.value))} /> */}
          <input
                type="text"
                name="bidAmount"
                className="input w-full"
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
          />
          <div className="divider text-base-content/60 m-0">Reports</div>

          {/* Details */}
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title text-xl font-medium">
              Description
            </div>
            <div className="collapse-content"> 
              <p>{listing.asset.description}</p>
              <p>{listing.asset.id}</p>
              <p>{listing.asset.name}</p>

            </div>
            {vbv2}
            {/* <ul>{vbv}</ul> */}
    
          </div>
        </>
      }
    
    />

  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => {
  const trans = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
      props: {
          ...trans,
      },
  }
}

export default ListingPage;

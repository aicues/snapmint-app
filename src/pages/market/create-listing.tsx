import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useCreateDirectListing,
  useCreateAuctionListing,
  useNFT,
  useAddress,
  useActiveListings,
  useSDK,
  useContractMetadata,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
  TransactionResultWithId,
} from "@thirdweb-dev/sdk";
import type { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Badge } from "react-daisyui";
import {targetChainId} from '@config/targetChainConfig';

// import { getNftMetadata, Nft, NftTokenType } from "@alch/alchemy-sdk";
// import { alchemy } from "@config/alchemy";



import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

import { toast } from 'react-toastify';


import useSWR from 'swr'
import NftCard from "@components/NftCard";
import Link from "next/link";

import TwoCardsContainer from "@components/TwoCardsContainer";
import { useTranslation } from "next-i18next";




type Props = {
  // Add custom props here
  countryName: string,
  city: string,
  isFreeGasCountry: string,
  inQatar: string,
}

// const CreateListing: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
const CreateListing: NextPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {

  // Translations
  const { t } = useTranslation('common');
  const router = useRouter();
  const myProps = props as Awaited<Props>// string

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { tokenId } = router.query as { tokenId: string };
  const { contractAddress } = router.query as { contractAddress: string };


  const [submitting, setSubmitting] = useState(false);
  const feePercent = 0.02;
  const [listingFees, setListingFees] = useState(1 * feePercent);


  // alchemy
  // const fetcher = (tokenId: { toString: () => any; }) => 
  //     getNftMetadata(alchemy, {
  //         tokenId: tokenId?.toString() ?? "",
  //         contract: { address: contractAddress?.toString() ?? "" },
  //         tokenType: NftTokenType.ERC721,
  //   })
  // .then(res => res)

  // const { data, error } = useSWR(tokenId, fetcher)

  // const nft = data as Nft;

  // console.log("nft", nft);

  const { contract } = useContract(contractAddress);
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const { data: nft, isLoading, error } = useNFT(contract, tokenId);
  // console.log("nft", nft);

  const address = useAddress();
  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();



  // Make
  // Initialize the marketplace contract
  const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace");

  // console.log("marketplace", marketplace);

  const { mutateAsync: makeDirectListing } = useCreateDirectListing(marketplace);
  const { mutateAsync: makeAuctionListing } = useCreateAuctionListing(marketplace);

  // Get Active Listings
  const { data: myListings } = useActiveListings(marketplace, { start: 0, count: 100, tokenContract: contractAddress, tokenId: tokenId });

  const [price, setPrice] = useState<number>(1.0);
  const [minimumPrice, setMinimumPrice] = useState<number>(1.0);

  const options = [
    // {value: 60 * 60 * 24 * 30, text: '-- Pick one --'},
    // {value: 60 * 60 * 1 * 1, text: 'One Hour'},
    { value: 60 * 60 * 24 * 30, text: 'One Month' },
    { value: 60 * 60 * 24 * 7, text: 'One Week' },
    { value: 60 * 60 * 24 * 1, text: 'One Day' },


  ];
  const [durationInSeconds, setDurationInSeconds] = useState<number>(options[0].value); // 1 week

  async function createAuctionListing(contractAddress: string, tokenId: string, price: number, minimumPrice: number, durationInSeconds: number) {
    try {
      console.log({ contractAddress, tokenId, price, minimumPrice, durationInSeconds });
      makeAuctionListing(
        {
          assetContractAddress: contractAddress, // Contract Address of the NFT
          buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
          currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
          listingDurationInSeconds: durationInSeconds, //60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
          quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
          reservePricePerToken: minimumPrice, // Minimum price, users cannot bid below this amount
          startTimestamp: new Date(), // When the listing will start
          tokenId: tokenId, // Token ID of the NFT.
        },
        {
          onSuccess: (tx) => {
            // return tx;
            alert("Success! \n" + tx.id);
            console.log("Success! \n" + tx.receipt);
            router.push(`/market/${tx.id}`);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }


  // const createAuctionListing2 = async () =>{

  //     return makeAuctionListing(
  //       {
  //         assetContractAddress: contractAddress, // Contract Address of the NFT
  //         buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
  //         currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
  //         listingDurationInSeconds: durationInSeconds, //60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
  //         quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
  //         reservePricePerToken: minimumPrice, // Minimum price, users cannot bid below this amount
  //         startTimestamp: new Date(), // When the listing will start
  //         tokenId: tokenId, // Token ID of the NFT.
  //       }
  //     );

  // }

  async function createDirectListing(contractAddress: string, tokenId: string, price: number, durationInSeconds: number) {
    try {
      makeDirectListing(
        {
          assetContractAddress: contractAddress, // Contract Address of the NFT
          buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
          currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
          listingDurationInSeconds: durationInSeconds, //60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
          quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
          startTimestamp: new Date(0), // When the listing will start
          tokenId: tokenId, // Token ID of the NFT.
        },
        {
          onSuccess: (tx) => {
            setSubmitting(false);
            toast.success("Listing Created Successfully !", {
              position: toast.POSITION.TOP_CENTER, toastId: "listing-created"
            });
            router.push(`/assets/polygon/${contractAddress}/${tokenId}`);
          },
        }
      );
    } catch (error) {
      setSubmitting(false);
      toast.error("Error in processing listing!", {
        position: toast.POSITION.TOP_CENTER, toastId: "listing-error-catch"
      });
      console.error(error);
    }
  }
  const sdk = useSDK();

  async function create() {

    if (!address) {
      toast.error("Please connect your Wallet!", {
        position: toast.POSITION.TOP_CENTER, toastId: "wallet-error"
      });
      return;
    }

    if (price < 0.1) {
      toast.error("Price cannot be less than 0.1 MATIC", {
        position: toast.POSITION.TOP_CENTER, toastId: "price-error"
      });
      return;
    }

    // Ensure user is on the correct network
    if (networkMismatch) {
      switchNetwork && switchNetwork(targetChainId);
      return;
    }

    if (address !== nft?.owner) {
      toast.error("You Dont Own this NFT !", {
        position: toast.POSITION.TOP_CENTER, toastId: "not-owner"
      });
    } else {



      if (myListings !== undefined && myListings?.length > 0) {

        toast.error("You Alreday Listed this NFT, cancel the listing first !", {
          position: toast.POSITION.TOP_CENTER, toastId: "already-listed"
        });

      } else {
        console.log("You dont have any listings");

        setSubmitting(true);

        try {
          // const listtingFeesTX = await sdk?.wallet.transfer("0x86d5E895751Ade30355b97349D4B5b9e2319832F", listingFees, NATIVE_TOKEN_ADDRESS);
          // if (listtingFeesTX) {
            if (true) {
            // await createAuctionListing(contractAddress, tokenId, price, minimumPrice, durationInSeconds);
            await createDirectListing(contractAddress, tokenId, price, durationInSeconds);

          } else {
            setSubmitting(false);
            toast.error("Error in processing listing fees !", {
              position: toast.POSITION.TOP_CENTER, toastId: "listing-fees-error"
            });
          }

        } catch (error) {
          setSubmitting(false);
          toast.error("Error in processing listing fees !", {
            position: toast.POSITION.TOP_CENTER, toastId: "listing-fees-error-catch"
          });
          // console.error(error);
        }




      }
    }
  }

  // const { mutate: create, isLoading } = useMutation({
  //   mutationFn: createAuctionListing,
  //   onError: (err: any) => {
  //     console.error(err);
  //     alert(err);
  //   },
  //   onSuccess: (txn: TransactionResultWithId) => {
  //     alert("Success! \n"+ txn.id);
  //     //router.push(`/listing/${txn.id}`);
  //   },
  // });


  return (
    <TwoCardsContainer card1_width="lg:w-1/2" card2_width="lg:w-1/2"
      Card1={
        <div className="card w-full bg-base-300 p-6 shadow-xl place-items-center justify-center">
          <MediaRenderer
            //src={nft?.media[0].gateway} //alchemy
            src={nft?.metadata.image}
            style={{
              // Fit the image to the container
              width: "50%",
              height: "50%",
              borderRadius: 16,
            }} />
        </div>

      }
      Card2={
        <>
          {/* <h1>{nft?.title} #{nft?.tokenId}</h1> */}
          <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
            {collectionMetadata?.name}{" "}
            <span className="text-primary/60">
              #{nft?.metadata?.id}
            </span>
          </h1>
          <h2 >{nft?.metadata?.name}</h2>
          <div className="divider text-base-content/60 m-0"></div>
          {/* <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl"> {nft?.metadata.name} #{nft?.metadata.id}</h1> */}
          <ul className="w-full">
            {/* Price */}
            <li key="price" className="form-control w-full">
              <label className="label w-full" htmlFor="price">
                <span className="label-text">Price</span>
                <span className="label-text-alt">{price}{"  "}⧫ {" MATIC"}</span>
              </label>
              <input type="number" name="price"
                min="1.0" max="100" step="0.05" value={price}
                className="input w-full"
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                  setListingFees(Number(e.target.value) * feePercent);
                }} />
            </li>
            {/* Minimum Price */}
            {/* <li key="minmumPrice" className="form-control w-full">
              <label className="label w-full" htmlFor="minmumPrice">
                <span className="label-text">Minimum Price</span>
                <span className="label-text-alt">{minimumPrice}{"  "}⧫</span>
              </label>
              <input type="number" name="price"
                min="0.05" max="10" step="0.05" value={minimumPrice}
                className="input w-full"
                onChange={(e) => setMinimumPrice(Number(e.target.value))} />
            </li> */}
            {/* Duration */}
            <li key="duration" className="form-control w-full">
              <label className="label">
                <span className="label-text">Listing Duration</span>
                <span className="label-text-alt"></span>
              </label>
              <select value={durationInSeconds} className="select select-bordered"
                onChange={(e) => setDurationInSeconds(Number(e.target.value))}>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </li>
            {/* <li key="fees" className="form-control w-full pt-6">
              <Badge color={"accent"} variant={"outline"} responsive size={"lg"} className="p-2 w-full h-full rounded-md justify-start">
                Listing fees: {listingFees}{"  "}⧫ {" MATIC + gas fees"}
              </Badge> */}
              {/* <span className="badge badge-accent badge-outline badge-lg p-4">Listing fees: {listingFees}{"  "}⧫ {" MATIC + gas"}</span> */}
            {/* </li> */}
            {/* Submit */}
            <li key="submit" className="form-control w-full py-4">
              {/* <button className="btn btn-primary w-full" onClick={create}>List</button> */}
              <Button type="submit" color={"accent"} fullWidth={true} responsive={true} active={true} animation={true} size={"md"}
                loading={submitting} disabled={submitting}
                onClick={create}
              >
                {t('market.list')}
              </Button>
            </li>
          </ul>

        </>
      }

    />

  )

}

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, query }) => {
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    // console.log("LOCAL", locale);
    return {
        props: {
            countryName: query?.countryName as string ,
            city: query?.city as string ,
            isFreeGasCountry: query?.isFreeGasCountry as string,
            inQatar: query?.inQatar as string,
            ...trans,
        },
    }
  }

// export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
//   const trans = await serverSideTranslations(locale ?? "en", ["common"]);
//   return {
//     props: {
//       ...trans,
//     },
//   }
// }

export default CreateListing;
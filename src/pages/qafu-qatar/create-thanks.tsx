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
import Link from "next/link";

type Props = {
    // Add custom props here
}

// const Home: NextPage = () => {
const Home:  NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  // Translations
  const { t }= useTranslation('common');
  
  const router = useRouter();
  // De-construct values out of the router.query.
  const { tokenId } = router.query as { tokenId: string };
  const { contractAddress } = router.query as { contractAddress: string };


  const shareUrl = `https:/www.snapmint.io/assets/polygon/${process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS}/${tokenId}`
  const shareText = `Qafu Qatar NFT #${tokenId} on Snapmint.io`;
  const shareHashtags = `Qafu_Qatar, NFT, World_Cup, Snapmint`;
  const shareVIa = `@snapmint_`;


  return (
    <section className="flex flex-col place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
      <div className="w-full pb-6">
        <h1 className="font-bold text-2xl sm:text-xl lg:text-2xl mb-2">Thank you for contribution in <span className="font-extrabold text-primary">Qafu Qatar</span> NFT Collection</h1>
        <h5>Now You may..</h5>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        {/* Tweet */}
        <Card className="bg-base-300 shadow-xl p-3">
          <Card.Title className='justify-center pb-4'>
            <h1 className="font-bold ">
              Share on Twitter
            </h1>
          </Card.Title>

          <Card.Actions className="justify-center pb-4">
            <Link className="btn w-[80%] btn-lg btn-info btn-xs md:btn-sm lg:btn-md xl:btn-lg"
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURI(shareText)}&hashtags=${shareHashtags}&via=${shareVIa}`}
              target="_blank"
            >
            Tweet
            </Link>
          </Card.Actions>
        </Card>

          {/* Sell in Marketplace */}
          <Card className="bg-base-300 shadow-xl p-3">
            <Card.Title className='justify-center pb-4'>
              <h1 className="font-bold ">
                Sell in Marketplace
              </h1>
            </Card.Title>
            <Card.Actions className="justify-center pb-4">
                    <Button responsive color={'accent'} size={"lg"} className=" w-[80%] "
                      onClick={() => { router.push(`/market/create-listing/?contractAddress=${process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS}&tokenId=${tokenId}`); }}>
                      Sell
                    </Button>
            </Card.Actions>
          </Card>

          {/* Mint another */}
          <Card className="bg-base-300 shadow-xl p-3">
            <Card.Title className='justify-center pb-4'>
              <h1 className="font-bold ">
                Create another 
              </h1>
            </Card.Title>
            <Card.Actions className="justify-center pb-4">
                    <Button responsive color={'primary'} size={"lg"} className=" w-[80%] "
                      onClick={() => { router.push(`/qafu-qatar/create/`); }}>
                      Mint
                    </Button>
            </Card.Actions>
          </Card>
        
          {/* Mint another */}
          <Card className="bg-base-300 shadow-xl p-3">
            <Card.Title className='justify-center pb-4'>
              <h1 className="font-bold ">
                Or just check it 
              </h1>
            </Card.Title>
            <Card.Actions className="justify-center pb-4">
                    <Button responsive size={"lg"} className=" w-[80%] "
                      onClick={() => { router.push(`/my/assets`); }}>
                      My Assets
                    </Button>
            </Card.Actions>
          </Card>
        </div>
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

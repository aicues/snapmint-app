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
    useContractMetadata,
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

  //Get the NFT
  const { contract } = useContract(process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS, "nft-drop")
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  const properties = nft?.metadata?.properties ;
    const arrayOfProperties = properties? Array.isArray(properties)
        ? properties
        : [properties]
    : undefined;

    const propertiesTable = arrayOfProperties?.map((obj, index) => (
      <Table key={index} compact={true} className="w-full text-primary-focus/60 [&>tr>th]:px-0 [&>tr>th]:py-0.5 [&>tr>td]:py-0.5 [&>tr>th>span]:text-base-content text-xs [&>tr>th]:bg-transparent [&>tr>td]:bg-transparent">
          <Table.Head>
              <span className="w-1/3">Trait</span>
              <span className="w-2/3">Value</span>
          </Table.Head>
          <Table.Body>
              {Object.entries(obj).map(([key, value], index) => (
                  <Table.Row key={index}>
                      <span className="w-1/3">{key}</span>
                      <span className="w-2/3">{value as string}</span>
                  </Table.Row>
              ))}
                  
          </Table.Body>
      </Table>

    ))

  // Tweet
  // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
  const shareUrl = `https:/www.snapmint.io/assets/polygon/${process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS}/${tokenId}`
  const shareText = `Mondo NFT #${tokenId} on Snapmint.io`;
  const shareHashtags = `Qatar2022, Mondo, Qafu_Qatar, NFT, World_Cup, Snapmint`;
  const shareVIa = `@snapmint_`;

  const cardClassName = 
        "bg-base-100 border-base-300 shadow-lg "
        +
        "[&>div.card-title]:!p-4 [&>div.card-title]:!pb-0 [&>div.card-title]:flex-col [&>div.card-title]:place-items-start "
        + 
        "[&>div.card-body]:!p-4 [&>div.card-body]:flex-col [&>div.card-body]:place-items-start";

  return (
    <section className="flex flex-col place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
      <div className="w-full pb-6">
      {/* NFT Section */}
      <h1 className="text-accent/80 font-semibold text-2xl sm:text-xl lg:text-2xl mb-4">
        Congratulations, here is your <span className="text-accent font-extrabold">Mondo</span> NFT
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 w-full">
            {!isLoading && nft ? (
                <>
                {/* 1. Media Card ------------------------------ */}
                <Card bordered={true} className="bg-base-100 p-4 shadow-lg place-items-center justify-center">
                    <figure>
                        <ThirdwebNftMedia metadata={nft?.metadata}
                            className="rounded-box"
                        />
                    </figure>
                    {/* <div>{nft?.metadata?.image}</div> */}
                </Card>
                {/* 2. NFT Info & Price Card ----------------------------- */}
                <Card  bordered={true} className={cardClassName}>
                    {/* Info */}
                    
                    <Card.Title className="text-base">
                        {/* <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
                            {collectionMetadata?.name}{" "}
                            <span className="text-primary/60">
                                #{nft?.metadata?.id}
                            </span>
                        </h1> */}
                        <h1 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">{nft?.metadata?.name}</h1>
                        <p>Owned by{":  "}<span className="text-accent">{formatDisplayAddress(nft?.owner)}</span></p>
                        <div className="divider text-base-content/60 m-0"></div>
                    </Card.Title>
                    {/* Details */}
                    <Card.Body className="text-base">
                        {/* <NftMaketCurrentActiveListing contractId={contractId} tokenId={tokenId}/> */}
                        <h1 className="font-extrabold">Description</h1>
                        <div className="">
                        {nft?.metadata.description}
                        </div>
                        {propertiesTable}

                    </Card.Body>
                </Card>
               

                </>
                
            // Loading state
            ) : ! error!== null ? (
                <div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>
            // Error state
            ) : (
                <div>{t('fetch.error')}</div>
            )}
            </div>
      </div>

      {/* Actions */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

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
                      onClick={() => { router.push(`/market/create-listing/?contractAddress=${process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS}&tokenId=${tokenId}`); }}>
                      Sell
                    </Button>
            </Card.Actions>
          </Card>

          {/* Mint another */}
          {/* <Card className="bg-base-300 shadow-xl p-3">
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
          </Card> */}
        
          {/* Mint another */}
          <Card className="bg-base-300 shadow-xl p-3">
            <Card.Title className='justify-center pb-4'>
              <h1 className="font-bold ">
                Or just check it 
              </h1>
            </Card.Title>
            <Card.Actions className="justify-center pb-4">
                    <Button responsive color={'primary'} size={"lg"} className=" w-[80%] "
                      onClick={() => { router.push(`/my/assets`); }}>
                      My Assets
                    </Button>
            </Card.Actions>
          </Card>
          <p> </p>
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

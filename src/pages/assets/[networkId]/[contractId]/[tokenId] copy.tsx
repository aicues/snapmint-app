import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage, NextPageContext , GetStaticProps, InferGetStaticPropsType, GetServerSideProps, GetStaticPaths } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAddress, useContractMetadata, useListing, useListings, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { alchemy } from "@config/alchemy";
import useSWR from 'swr'
import {
  OwnedNft,
  OwnedNftsResponse,
  getNftsForOwner,
} from "@alch/alchemy-sdk";

import NftCard from "@components/NftCard";
import NftInfo from "@components/NftInfo";
import NftCollection from "@components/NftCollection";
import NftMaketListings from "@components/NftMaketListings";

import {Card, Button, Drawer, Menu, Navbar } from "react-daisyui";

import { useContract, useNFT, useNFTs, ThirdwebNftMedia, ThirdwebNftMediaProps } from "@thirdweb-dev/react";

import { ParsedUrlQuery } from 'querystring'
import { NFTCollection } from "@thirdweb-dev/sdk";
import { formatDisplayAddress } from "@utils/web3utils";

type Props = {
    // Add custom props here

}

const Asset: NextPage = (_props: InferGetStaticPropsType<typeof getServerSideProps>) => {

    const { t }= useTranslation('common');

    const router = useRouter();
    // De-construct networkId/contractId/tokenId out of the router.query.
    const { networkId } = router.query as { networkId: string };
    const { contractId } = router.query as { contractId: string };
    const { tokenId } = router.query as { tokenId: string };

    // Hooks to detect user is on the right network and switch them if they are not
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    // Get the NFT
    const { contract } = useContract(contractId);
    const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);
    const { data: nft, isLoading, error } = useNFT(contract, tokenId);

    // Initialize the marketplace contract
    // const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace");

    // Get listing for this NFT, ref: https://portal.thirdweb.com/typescript/sdk.marketplacefilter
    // const { data: listings} = useListings(marketplace, { start: 0, count: 100, tokenContract: contractId, tokenId: tokenId });

    // console.log(listings);


    // todo: error alwyes null ? how to check?
    //console.log("error", error);



    return (
        <section className="bg-base-200 flex flex-col md:flex-row lg:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max w-full">
            {!isLoading && nft ? (
                <Card side="lg" className="flex flex-col md:flex-row lg:flex-row place-items-start w-full">
                    <div className="lg:w-1/2 p-4 bg-base-300 rounded-box">
                        {/* <Card.Image className="rounded-box" src={nft?.metadata.image as string}/> */}
                        <figure><ThirdwebNftMedia metadata={nft?.metadata}/></figure>
                    </div>
                    <Card.Body className="lg:w-1/2 p-4 pt-0">
                        <Card className="lg:p-6 pt-0">
                            <Card.Title tag="h1" className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
                                {collectionMetadata?.name}{" "}
                                <span className="text-primary/60">#{nft?.metadata?.id}</span>
                            </Card.Title>
                            <h2>{nft?.metadata?.name}</h2>
                            <p>Owned By:{" "}{formatDisplayAddress(nft.owner)}</p>

                            {/* Details */}
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 rounded-box w-full">
                                        <input type="checkbox" className="peer" /> 
                                        <div className="collapse-title text-xl font-medium px-0">
                                        Description
                                        </div>
                                        <div className="collapse-content px-0"> 
                                        <p>{nft?.metadata?.description}</p>
                                        {/* <p>{listing.asset.id}</p>
                                        <p>{listing.asset.name}</p> */}

                                        </div>
                                        {/* {vbv2} */}
                                        {/* <ul>{vbv}</ul> */}
                                
                                    </div>




                            <NftMaketListings contractId={contractId} tokenId={tokenId} />
                            <p> </p>
                            <Card.Actions className="justify-end">
                                <Button color="primary">Buy Now</Button>
                            </Card.Actions>
                        </Card>

                    </Card.Body>
                </Card>
                // <ThirdwebNftMedia metadata={nft.metadata} />

            // Loading state
            ) : ! error!== null ? (
                <div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>
            // Error state
            ) : (
                <div>{t('fetch.error')}</div>
            )}
            
      </section>
    )
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => {
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    return {
        props: {
            ...trans,
        },
    }
  }

export default Asset;
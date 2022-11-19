/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, ThirdwebNftMedia, useContract, useContractMetadata, useNFTs, useNFT} from "@thirdweb-dev/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {Card, Button, Table, Avatar} from "react-daisyui";

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
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const { data: nfts, isLoading, error  } = useNFTs(contract);

  


  //how many columns to display in grid for larger screens
  const gridClassName = columns===6 ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6" : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4";


  return (
    <Card className="bg-base-300 flex flex-col place-items-start w-full">
       {/* Collection metadata */}
      <Card.Title className="p-4">
        {!loadingMetadata &&
          <>
          <Avatar shape={"square"} border={true} borderColor={"primary"} size={"xs"} className="!w-10 !h-10" src={collectionMetadata?.image} />
          <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start lg:flex lg:justify-start">
              <span className="text-2xl font-bold">{collectionMetadata?.name} / {collectionMetadata?.symbol}</span>
              {/* <span className="text-2xl font-bold">/{collectionMetadata?.fee_recipient} / {collectionMetadata?.seller_fee_basis_points}</span> */}
          </div>
          </>
        }
      </Card.Title>

      {/* Collection NFTs */}
      {/* ref: https://daily-dev-tips.com/posts/tailwind-grid-responsive-4-column-blocks/ */}
      <Card.Body className="p-4 container mx-auto">
        <div className={gridClassName}>
        {!isLoading ?
          (
            <>
            {nfts?.map(e =>
              <Card key={e.metadata.id} compact={true} className="bg-base-100 shadow-xl">
                <figure><ThirdwebNftMedia metadata={e.metadata}/></figure>
                <Card.Body>
                  <Card.Title>{e.metadata.name}</Card.Title>
                  <Table compact={true} className="w-full">
                    <Table.Body className="[&>tr>th]:px-0 [&>tr>th]:py-0.5 [&>tr>td]:py-0.5 [&>tr>th>span]:text-base-content text-xs">
                      <Table.Row >
                        <span>Token:</span>
                        <span>#{e.metadata.id}</span>
                      </Table.Row>
                      <Table.Row >
                        <span>Supply:</span>
                        <span>{e.supply}</span>
                      </Table.Row>
                      <Table.Row>
                        <span>Owner:</span>
                        <span className="text-accent">{formatDisplayAddress(e.owner)}</span>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  {/* dummy */}
                  <p> </p>
                  <Card.Actions className="justify-end">
                    <Button color="primary" size={"sm"}>Buy Now</Button>
                  </Card.Actions>
                </Card.Body>
              </Card>
            )}
            </>
          ) : (
            <div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>
          )}
        </div>
        
      </Card.Body>
    </Card>

  );
};

export default NftCollection;
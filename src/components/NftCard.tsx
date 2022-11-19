import * as React from "react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";
import Link from "next/link";
import {Card, Table, Button} from "react-daisyui";
import CardBody from "react-daisyui/dist/Card/CardBody";

export const NftCard: React.FC<{
  image: string;
  tokenId: string;
  listingId?: string;
  description: string;
  title: string;
  contractAddress: string;
  ownerAddress: string;
  buyoutPrice?: string;
  children: React.ReactElement<any, any>;
}> = ({ image, tokenId, listingId, description, title, contractAddress, ownerAddress, buyoutPrice}) => {

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  // get collection info
  const { contract: nftCollection } = useContract(contractAddress, "nft-collection" );
  const { data: collectionMetadata, isLoading: loadingMetadata } = useContractMetadata(nftCollection);

  return (
    <Card compact={true} imageFull className="bg-base-100 shadow-xl [&.card]:before:opacity-50">
      <figure><MediaRenderer src={image} /></figure>
      <Card.Body>
        <Card.Title className="text-primary">
          {collectionMetadata?.name}{" "}<span>#{tokenId}</span>
        </Card.Title>
        <Table compact={true} className="w-full">
          <Table.Body className="[&>tr>th]:px-0 [&>tr>th]:py-0.5 [&>tr>td]:py-0.5 [&>tr>th>span]:text-base-content text-xs [&>tr>th]:bg-transparent [&>tr>td]:bg-transparent">
            <Table.Row >
              <span>{title}</span>
              <span></span>
            </Table.Row>
            {/* <Table.Row >
              <span></span>
              <span>{description ? description.slice(0, 200) : ""}</span>
            </Table.Row> */}
            <Table.Row>
              <span>Owner:</span>
              <span className="text-accent">{formatDisplayAddress(ownerAddress)}</span>
              {/* <a
                        target="_blank"
                        className="text-blue-700"
                        href={`${etherscanURL}/token/${listing.sellerAddress}`}
                        rel="noreferrer"
                      >
                        {formatDisplayAddress(listing.sellerAddress)}
                      </a> */}
            </Table.Row>
            <Table.Row >
              <span>Price:</span>
              <span>{buyoutPrice}</span>
            </Table.Row>
          </Table.Body>
        </Table>
        {/* dummy */}
        <p> </p>
        <Card.Actions className="justify-end">
        <span className="badge badge-lg badge-info">{buyoutPrice}</span>
          <Button color="primary" size={"sm"}
            onClick={() => {
              router.push(
                `/assets/polygon/${contractAddress}/${tokenId}`
                // `/market/${listingId}`
                // `/market/create-listing/${address}?tokenId=${id}`
              );
            }}
          
          >Buy Now</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

export default NftCard;
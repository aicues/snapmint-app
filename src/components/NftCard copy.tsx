import * as React from "react";
import { useRouter } from "next/router";
import { formatDisplayAddress } from "@utils/web3utils";
import { getEtherscanURL } from "@config/targetChainConfig";
import { MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";
import Link from "next/link";

export const NftCard: React.FC<{
  image: string;
  id: string;
  description: string;
  title: string;
  contractAddress: string;
  ownerAddress: string;
  children: React.ReactElement<any, any>;
}> = ({ image, id, description, title, contractAddress, ownerAddress}) => {

  const router = useRouter();
  const etherscanURL = getEtherscanURL();

  // get collection info
  const { contract: nftCollection } = useContract(contractAddress, "nft-collection" );
  const { data: metaCollection } = useContractMetadata(nftCollection );

  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl">
      <figure>
        <MediaRenderer
          src={image}
          // style={{
          //   // Fit the image to the container
          //   width: "100%",
          //   height: "100%",
          //   borderTopRightRadius: 16,
          //   borderTopLeftRadius: 16,
          // }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">
          {metaCollection?.name}{" "}<span>#{id}</span>
          {/* <div className="badge badge-secondary">
            <Link
              target="_blank"
              className="text-blue-700"
              href={`${etherscanURL}token/${contractAddress}`}
              rel="noreferrer"
            >
              {formatDisplayAddress(contractAddress)}
            </Link>
          </div> */}
        </h2>
        <p>{title}</p>
        <p> Owned by{" "}{formatDisplayAddress(ownerAddress)} </p>
        <p>{description ? description.slice(0, 200) : "No Description"}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => {
                        router.push(
                          `/market/create-listing/?contractAddress=${contractAddress}&tokenId=${id}`
                          // `/market/create-listing/?tokenId=${id}`
                          // `/market/create-listing/${address}?tokenId=${id}`
                        );
                      }}>Buy Now</button>
        </div>
      </div>
      {/* <div className="p-6">{children}</div> */}
    </div>
  );
};

export default NftCard;
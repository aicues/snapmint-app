export interface INftCreate {
    name: string;
    authorAddress: string;
    description: string;
    traits: {name:string, value:string}[];
}

export interface IMakeAuctionListing {
    buyoutPricePerToken: number;
    reservePricePerToken: number;
    listingDurationInSeconds: number;
    
}

// Data that we'll pass to the NFT Collection contract to mint the NFT
// const nftData = {
//   name: nftName as string,
//   image: imagePath as string,
//   description: description as string,
// };

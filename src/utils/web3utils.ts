/***
 * For doing various formatting of addresses, big numbers, etc
 */
 import { BigNumber, BigNumberish, ethers } from "ethers";
 import { AuctionListing, DirectListing, ListingType } from "@thirdweb-dev/sdk";

 export const formatDisplayAddress = (address: string): string => {
   return (
     address?.slice(0, 6).concat("...").concat(address.slice(-4)) ?? "No Address"
   );
 };
 
 export const hexToETH = (num: BigNumberish): string => {
   return ethers.utils.formatEther(num);
 };
 
 export const hextoNum = (num: BigNumberish): string => {
   return BigNumber.from(num).toString();
 };

 export const epochtoDateString = (epoch: BigNumberish, locale: string): string => {

  let date = new Date(BigNumber.from(epoch).toNumber() * 1000);
  
  let options: Intl.DateTimeFormatOptions = {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",  hour12: true, timeZoneName: 'longOffset', timeZone: 'GMT'
  };
 
  return date.toLocaleDateString(locale, options);
};

export const isEpochExpired = (epoch: BigNumberish): boolean => {

  let date = new Date(BigNumber.from(epoch).toNumber() * 1000);
  let now = new Date();
  
  return date < now; 
};

export const isListingExpired = (listing: AuctionListing | DirectListing): boolean => {

  if (listing.type === ListingType.Auction) {
    return isEpochExpired((listing as AuctionListing).endTimeInEpochSeconds);

  } else if (listing.type === ListingType.Direct) {

    return isEpochExpired((listing as DirectListing).secondsUntilEnd);

  } else {
    return false;
  }
};
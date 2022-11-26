/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useContract, useContractMetadata, useBalance} from "@thirdweb-dev/react";
import { useTranslation } from "next-i18next";
import {Card,  Avatar} from "react-daisyui";

export const TokenOwned: React.FC<{
  tokenAddress: string;

}> = ({ tokenAddress}) => {

   // Translations
   const { t }= useTranslation('common');

  // get token info
  const { contract, isLoading } = useContract(tokenAddress, "token-drop");
 
  const { data: tokenMetadata , isLoading: loadingMetadata} = useContractMetadata(contract);

 
  const balance = useBalance(tokenAddress);

  // const address = useAddress();

  if (isLoading || loadingMetadata) {
    return (
      <Card className="flex flex-row place-items-start w-full">
        <Card.Body className="p-4">
          <div><button className="btn btn-ghost loading btn-lg btn-circle"/><span>{t('fetch.loading')}</span></div>
        </Card.Body>
      </Card>
    );
  }


  return (
    <Card className="flex flex-row place-items-start w-full border-base-100" bordered>
       {/* Collection metadata */}
      <Card.Title className="p-4">
          <Avatar shape={"square"} border={false} borderColor={"primary"} size={"xs"} className="!w-10 !h-10" src={tokenMetadata?.image} />
          <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start lg:flex lg:justify-start">
              <span className="">{balance?.data?.displayValue}
                <span className="text-accent">{"  "}{tokenMetadata?.symbol}</span>  
              </span>
          </div>
      </Card.Title>

 
      <Card.Body className="p-4 place-items-end ">
      {/* <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start lg:flex lg:justify-start">
        <span className="font-bold"><span className="text-accent">{balance?.data?.displayValue}</span>  {"  "} {tokenMetadata?.symbol}</span>
      </div> */}
      </Card.Body>
    </Card>

  );
};

export default TokenOwned;
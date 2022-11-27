/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { ethers } from "ethers";
import { useContract, useContractMetadata, useBalance } from "@thirdweb-dev/react";
import { useTranslation } from "next-i18next";
import { Card, Avatar, Button } from "react-daisyui";

export const TokenOwned: React.FC<{
  tokenAddress: string;
  tokenSymbol: string;

}> = ({ tokenAddress, tokenSymbol }) => {

  const tokenDecimals = 18;
  const tokenImage = 'http://www.snapmint.io/assets/' + tokenSymbol + '/' + tokenSymbol + '-256.png';



  // Translations
  const { t } = useTranslation('common');

  // get token info
  const { contract, isLoading } = useContract(tokenAddress, "token-drop");

  const { data: tokenMetadata, isLoading: loadingMetadata } = useContractMetadata(contract);


  const balance = useBalance(tokenAddress);

  // const address = useAddress();

  if (isLoading || loadingMetadata) {
    return (
      <Card className="flex flex-row place-items-start w-full">
        <Card.Body className="p-4">
          <div><button className="btn btn-ghost loading btn-lg btn-circle" /><span>{t('fetch.loading')}</span></div>
        </Card.Body>
      </Card>
    );
  }


  // Make sure we're in the browser
  // if (typeof window !== 'undefined') {
  //   router.push('/home');
  //   return; 
  // }
  //ref: https://docs.metamask.io/guide/registering-your-token.html

  const handleAddTokenToMetaMask = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window?.ethereum?.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenMetadata.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }

    } catch (e) {
      console.error(e)
    }
  }


  return (
    <Card className="flex flex-row place-items-start w-full border-base-100" bordered compact>
      {/* Collection metadata */}
      <Card.Title className="p-4">
        <Avatar shape={"square"} border={false} borderColor={"primary"} size={24} className="" src={tokenMetadata?.image} />
        <div className="mx-2 flex-1 justify-center px-2 md:flex md:justify-start lg:flex lg:justify-start">
          <span className="">{balance?.data?.displayValue}
            <span className="text-accent mx-4">{"  "}{tokenMetadata?.symbol}</span>
            <Button size={"xs"} color={"secondary"} variant={"outline"} 
              onClick={handleAddTokenToMetaMask}>
              Add Token to MetaMask
            </Button>
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
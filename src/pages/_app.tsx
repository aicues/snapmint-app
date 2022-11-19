import '../styles/globals.css'
import React from "react";
import Router from 'next/router'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Head from "next/head";
import { appWithTranslation } from 'next-i18next'
import Loader from '@components/Loader';


// import { WagmiConfig, createClient, chain } from "wagmi";
// import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import Layout from "@components/Layout";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

// const client = createClient(
//   getDefaultClient({
//     appName: "Snapmint",
//     alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
//     //infuraId: process.env.INFURA_ID,
//     chains: [chain.mainnet, chain.polygonMumbai]
//   })
// );

const MyApp = ({ Component, pageProps }: AppProps) => {

  // ref: https://blog.logrocket.com/how-to-build-a-progress-bar-indicator-in-next-js/#using-react-spinners
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url)=>{
      setIsLoading(true)

    });
    Router.events.on("routeChangeComplete", (url)=>{
      setIsLoading(false)
    });

    Router.events.on("routeChangeError", (url) =>{
      setIsLoading(false)
    });

  }, [])

  // const queryClient = new QueryClient();

  // 


  return (
    <ThirdwebProvider desiredChainId={activeChainId} 
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       // relayerForwarderAddress: process.env.NEXT_PUBLIC_RELAYER_FORWARDER_ADDRESS as string,
      //       relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL as string,
      //       // useEOAForwarder: true,
      //     }
      //   }
      // }}
    >
      {/* <QueryClientProvider client={queryClient}> */}
      <Head>
        <title>Snapmint | </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn How To Use Thirdweb's Marketplace with Next.JS To List Your NFTs For Sale, Accept Bids, and Buy NFTs"
        />
        <meta
          name="keywords"
          content="Thirdweb, Marketplace, NFT Marketplace Tutorial, NFT Auction Tutorial, How To Make OpenSea"
        />
      </Head>
      {isLoading && <Loader/>}
      {/* <WagmiConfig client={client}>
      <ConnectKitProvider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ConnectKitProvider>
      </WagmiConfig> */}
      {/* <ThirdwebGuideFooter /> */}
      {/* </QueryClientProvider> */}
    </ThirdwebProvider>
  );
}

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp/*, nextI18NextConfig */)

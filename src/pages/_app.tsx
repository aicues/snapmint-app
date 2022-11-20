import '../styles/globals.css'
import React from "react";
import Router from 'next/router'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Head from "next/head";
import { appWithTranslation } from 'next-i18next'
import Loader from '@components/Loader';

import { GoogleAnalytics } from "nextjs-google-analytics";


// import { WagmiConfig, createClient, chain } from "wagmi";
// import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import Layout from "@components/Layout";


// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;



const MyApp = ({ Component, pageProps }: AppProps) => {

  // ref: https://blog.logrocket.com/how-to-build-a-progress-bar-indicator-in-next-js/#using-react-spinners
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   Router.events.on("routeChangeStart", (url)=>{
  //     setIsLoading(true)

  //   });
  //   Router.events.on("routeChangeComplete", (url)=>{
  //     setIsLoading(false)
  //   });

  //   Router.events.on("routeChangeError", (url) =>{
  //     setIsLoading(false)
  //   });

  // }, [])

  


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

      <Head>
        <title>Snapmint | </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=""
        />
        <meta
          name="keywords"
          content="Marketplace, NFT Marketplace, NFT Auction"
        />
      </Head>
      {/* {isLoading && <Loader/>} */}

      <Layout>
      <>
        <GoogleAnalytics trackPageViews gaMeasurementId='G-7TJ8RVN4FJ'/>
        <Component {...pageProps} />
      </>
      </Layout>

    </ThirdwebProvider>
  );
}

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp/*, nextI18NextConfig */)

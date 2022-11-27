import '../styles/globals.css'
import React from "react";
import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Head from "next/head";
import { appWithTranslation } from 'next-i18next'
import Loader from '@components/Loader';
import {targetChainId} from '@config/targetChainConfig';
import { inDevEnvironment } from "@config/inDevEnvironment";
import posthog from "posthog-js";
import { GoogleAnalytics } from "nextjs-google-analytics";
import SEO from '../../next-seo.config';


// import { WagmiConfig, createClient, chain } from "wagmi";
// import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { ChainId, DAppMetaData, ThirdwebProvider } from "@thirdweb-dev/react";
import ChainContext from "@config/ChainContext";

import Layout from "@components/Layout";
import { DefaultSeo } from 'next-seo';


// This is the chainId your dApp will work on.
const activeChainId = targetChainId;







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

  const router = useRouter();

  
  const { country } = router.query as { country: string };
  const { city } = router.query as { city: string };
  const { lat } = router.query as { lat: string };
  const { lon } = router.query as { lon: string };
  const { isFreeGasCountry } = router.query as { isFreeGasCountry: string };
  // console.log("-- router", router.query);
  // console.log("-- country: ", country);
  // console.log("-- city: ", city);
  // console.log("-- lat: ", lat);
  // console.log("-- lon: ", lon);

  useEffect(() => {
    // Init PostHog
  if(!inDevEnvironment) { 
    posthog.init("phc_La3SlzkBVemY3jCF5BFG5x1oinRJ8iXdHGw5wr4jPMP", {
      api_host: "https://eu.posthog.com",
      autocapture: true,
      debug: false,
      capture_pageview: true,
    });
    // register several super properties when a user signs up
    posthog.register({
      'Country': country,
      'City': city,
      'Lat': lat,
      'Lon': lon
    });
    // posthog.register({
    //   tw_dashboard_version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    // });
  }

  }, [country, city, lat, lon]);
  
  const snapmintMetaData :  DAppMetaData = {
    name: 'Snapmint',
    description: 'Snapmint is a decentralized minting platform for NFTs.',
    url: 'https://www.snapmint.io',
    logoUrl: 'https://www.snapmint.io/logo.svg',
    isDarkMode: true
  }
  const head = (
    <Head>
    <title>Snapmint | </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="xxx" />
    <meta
      name="keywords"
      content="Marketplace, NFT Marketplace, NFT Auction" />
  </Head>
  );



  // const freeGasCountries : string[] = ["QA","AE","SA"] //, "US", "EG", "KW", "BH", "OM", "JO", "LB", "SY", "IQ", "YE", "PS", "IL", "TR", "CY", "GR", "RO", "BG", "MK", "AL", "RS", "ME", "BA", "HR", "SI", "AT", "CH", "DE", "NL", "BE", "LU", "FR", "ES", "PT", "AD", "MC", "SM", "VA", "IT", "LI", "MT", "PL", "SK", "CZ", "HU", "DK", "SE", "NO", "FI", "EE", "LV", "LT", "BY", "UA", "MD", "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ", "CN", "JP", "KR", "TW", "HK", "MO", "SG", "MY", "TH", "VN", "ID", "PH", "AU", "NZ", "FJ", "PG", "SB", "VU", "NC", "PF", "CK", "WS", "TO", "TV", "KI", "NU", "FM", "MH", "PW", "GU", "MP", "AS", "PR", "VI", "CA", "MX", "CR", "PA", "DO", "HT", "CU", "BS", "BB", "AG", "DM", "GD", "KN", "LC", "VC", "TT", "JM", "BZ", "SV", "HN", "NI", "GT", "BQ", "CW", "SX", "AW", "AI", "BM", "VG", "KY", "MS", "TC", "BM", "GL", "FO", "IS", "GB", "IE", "GG", "IM", "JE", "AX", "EE", "LV", "LT", "BY", "UA", "MD", "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ", "CN", "JP", "KR", "TW", "HK", "MO", "SG", "MY", "TH", "VN", "ID", "PH", "AU",

  if (isFreeGasCountry && isFreeGasCountry==="true") {
    return (
      <ThirdwebProvider desiredChainId={activeChainId} dAppMeta={snapmintMetaData}
        sdkOptions={{
          gasless: {
            openzeppelin: {
              relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
            },
          },
        }}
    >
      {head}
      <Layout>
        <>
          <GoogleAnalytics trackPageViews gaMeasurementId='G-7TJ8RVN4FJ' />
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </>
      </Layout>
      </ThirdwebProvider>
    );
  }


  else return (

      <ThirdwebProvider desiredChainId={activeChainId} dAppMeta={snapmintMetaData}>
        {head}
        <Layout>
          <>
            <GoogleAnalytics trackPageViews gaMeasurementId='G-7TJ8RVN4FJ' />
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </>
        </Layout>

      </ThirdwebProvider>
      
  );
}

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp/*, nextI18NextConfig */)

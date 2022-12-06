import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: 'Snapmint | Mint your Content',
  defaultTitle: 'Snapmint | Mint your Content',
  title: 'Snapmint | Mint your Content',
  description: 'NFT Marketplace and NFT Creator Platform',
  canonical:'https://www.snapmint.io/',

  openGraph: {
    title: 'Snapmint | Mint your Content',
    description: 'NFT Marketplace and NFT Creator Platform',
    url: 'https://www.snapmint.io/',
    siteName: 'Snapmint',
    type: 'website',
    locale: 'en',
    images: [
      {
        url: 'https://www.snapmint.io/og/twitter-cover-2.png',
        width: 876,
        height: 438,
        alt: 'Snapmint',
      },
    ],
    
  },
  twitter: {
    handle: '@snapmint_',
    site: '@snapmint_',
    cardType: 'summary_large_image',
  },
};

export default config;
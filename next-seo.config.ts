import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: 'Snapmint',
  defaultTitle: 'Snapmint',
  title: 'Snapmint',
  description: 'NFT Marketplace and NFT Creator Platform',
  canonical:'https://www.snapmint.io/',

  openGraph: {
    title: 'Snapmint',
    description: 'NFT Marketplace and NFT Creator Platform',
    url: 'https://www.snapmint.io/',
    siteName: 'Snapmint',
    type: 'website',
    locale: 'en',
    images: [
      {
        url: 'https://www.snapmint.io/og/twitter-cover-2.png',
        width: 1500,
        height: 500,
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
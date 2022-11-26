import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.snapmint.io/',
    siteName: 'Snapmint',
  },
  twitter: {
    handle: '@snapmint_',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default config;
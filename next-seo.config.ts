import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: 'AICues | AI Services, Cues for everyone',
  defaultTitle: 'AICues | AI Services, Cues for everyone',
  title: 'AICues | AI Services, Cues for everyone',
  description: 'Prompt Marketplace and AI Servcies Platform',
  canonical:'https://www.AICues.io/',

  openGraph: {
    title: 'AICues | AI Services, Cues for everyone',
    description: 'Prompt Marketplace and AI Servcies Platform',
    url: 'https://www.AICues.io/',
    siteName: 'AICues',
    type: 'website',
    locale: 'en',
    images: [
      {
        url: 'https://www.AICues.io/og/twitter-cover-2.png',
        width: 876,
        height: 438,
        alt: 'AICues',
      },
    ],
    
  },
  twitter: {
    handle: '@AICues_',
    site: '@AICues_',
    cardType: 'summary_large_image',
  },
};

export default config;
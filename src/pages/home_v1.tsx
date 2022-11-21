import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";


import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HeroQafuQatar from "@components/Hero/HeroQafuQatar-V1";

type Props = {
  // Add custom props here
}

const Home_V1= (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

    const { t }= useTranslation('common');

    return (
        <>
          <HeroQafuQatar />
          {/* <SectionV1/> */}
          {/* <div>{t('home.home-title')}</div> */}
        </>
    );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common']),
  },
})

export default Home_V1;



// export async function getStaticProps({ locale }: GetStaticPropsContext) {
//   console.log('Home_V1.getStaticProps locale  :----- '+locale);
//   return { props: {
//     ...(await serverSideTranslations(locale as string, ["common"]))
//     },
//   };
// }
// export function getStaticProps({ locale } :{ locale: string }) {
//     return {
//       props: {
//         messages: require(`../locales/${locale}.json`),
//       },
//     };
//   }
// // export async function getStaticProps({ locale } :{ locale: string }) {
// export const  getStaticProps= async({ locale } :{ locale: string }) => {
//     console.log('Home_V1.getStaticProps locale :----- '+locale);
//     return { props: { 
//         ...(await serverSideTranslations(locale, ["common"]))
        
        
//         // ,
//         // className: "template-color-1"
//      }
//     };
// }
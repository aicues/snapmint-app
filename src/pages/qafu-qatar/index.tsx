import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslations } from "next-intl";

import HeroQafuQatar from "@components/Hero/HeroQafuQatar-V1";

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactDom from 'react-dom'
// import * from './index.md'
// ts-ignore: md file and not a module
import MarkdownSection from '@components/MarkdownSection'
import post from  './post.md'

type Props = {
  // Add custom props here
}

const Index= (_props: InferGetStaticPropsType<typeof getStaticProps>) => {


    const t = useTranslation("common");


    return (
        <>
          <HeroQafuQatar />

          {/* <MarkdownSection background="bg-base-300" markdown={post} /> */}

        </>
    );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const trans = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
      props: {
          ...trans,
      },
  }
}

export default Index;



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
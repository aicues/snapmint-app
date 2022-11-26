import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslations } from "next-intl";

import HeroSym from "@components/Hero/HeroSym-V1";

type Props = {
  // Add custom props here
}

const Index= (_props: InferGetStaticPropsType<typeof getStaticProps>) => {


  const t = useTranslation("common");

    return (
        <>
          <HeroSym isFreeGasCountry=""/>
          <section className="p-10 text-base-content">
            {/* <div>Sym</div> */}
          </section>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, query }) => {
  export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    return {
        props: {
            ...trans,
        },
    }
  }

export default Index;
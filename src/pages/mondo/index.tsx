import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslations } from "next-intl";

import HeroQafuQatar from "@components/Hero/HeroQafuQatar-V1";

type Props = {
  // Add custom props here
}

const Index= (_props: InferGetStaticPropsType<typeof getStaticProps>) => {


    const t = useTranslation("common");

    return (
        <>
          <HeroQafuQatar />
          <section className="p-10 bg-base-300 text-base-content">
            {/* <div>Mondo</div> */}
          </section>
          {/* <div>{t('home.home-title')}</div> */}
        </>
    );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common',]),
  },
})

export default Index;
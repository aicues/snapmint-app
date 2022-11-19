import React from "react";
import { useRouter } from "next/router";
import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAddress } from "@thirdweb-dev/react";

import NftCollectionOwned from "@components/NftCollectionOwned";

type Props = {
    // Add custom props here

}
const MyAssets: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

    // Translations
    const { t }= useTranslation('common');
    const userAddress = useAddress();

    return (
        <section className="bg-base-200 flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
            <NftCollectionOwned
                ownerAddress={userAddress as string}
                collectionAddress={process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS as string}
                columns={6}
                displayCTA={true}
                />
        </section>

    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    return {
        props: {
            ...trans,
        },
    }
}

export default MyAssets;
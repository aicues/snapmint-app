import React from "react";
import { useRouter } from "next/router";
import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAddress } from "@thirdweb-dev/react";

import {Divider} from "react-daisyui";
import NftCollectionOwned from "@components/NftCollectionOwned";
import PleaseConnectWallet from "@components/Wallets/PleaseConnectWallet";
import TokenOwned from "@components/tokens/TokenOwned";

type Props = {
    // Add custom props here

}
const MyAssets: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

    // Translations
    const { t }= useTranslation('common');
    const userAddress = useAddress();

    // if(!userAddress) return PleaseConnectWallet;
    if (!userAddress) {
        return <PleaseConnectWallet/>;
      }

    return (
        <section className="flex flex-col place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
            <h3 className="p-2 text-base-content/60 text-xl font-extrabold">Tokens</h3>
            <TokenOwned tokenSymbol="sym" tokenAddress={process.env.NEXT_PUBLIC_TOKEN_DROP_SYM_ADDRESS as string}/>
            {/* <Divider className="my-1">NFT Collections</Divider> */}
            <h3 className="p-2 mt-4 text-base-content/60 text-xl font-extrabold">NFT Collections</h3>
            <NftCollectionOwned
                ownerAddress={userAddress as string}
                collectionAddress={process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS as string}
                columns={6}
                displayCTA={true}
                />
            {/* <p></p> */}
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
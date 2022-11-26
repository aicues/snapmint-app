import type { NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslations } from "next-intl";

import HeroSym from "@components/Hero/HeroSym-V1";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useContract } from "@thirdweb-dev/react";
import { formatDisplayAddress } from "@utils/web3utils";

type Props = {
  // Add custom props here
}


/// NOT WORKING -----------------------------------------
/// https://blog.thirdweb.com/guides/claim-erc20-token-nextjs/
/// Depreciated ? or thos s for TOEN not TOKEN DROP
/// ------------------------------------------------------


const SymTokenHolders= (_props: InferGetStaticPropsType<typeof getStaticProps>) => {


  const t = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [holders, setHolders] = useState([]);

  const tokenAddress  = process.env.NEXT_PUBLIC_TOKEN_DROP_SYM_ADDRESS
  // const { contract } = useContract(tokenAddress, "token-drop");


  async function checkHolders() {
    const sdk = new ThirdwebSDK("mumbai"); // configure this to your network
    const token = await sdk.getToken(tokenAddress);
    const balances = await token.history.getAllHolderBalances();

    setHolders(balances);
    setLoading(false);
  }

  useEffect(() => {
    checkHolders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

    return (
        <>
          <section className="p-10 text-base-content">
          <div>
          {holders
            .sort(
              (a, b) =>
                parseInt(b.balance.displayValue) -
                parseInt(a.balance.displayValue),
            )
            .map((holder) => (
              <div key={holder.holder}>
                <p>{formatDisplayAddress(holder.holder)}</p>
                <p>
                  {holder.balance.displayValue} {holder.balance.symbol}
                </p>
              </div>
            ))}
        </div>
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
  
// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
// export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale ?? 'en', ['common']),
//   },
// })

export default SymTokenHolders;
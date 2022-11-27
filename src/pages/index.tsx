import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link'
import router, { useRouter } from 'next/router'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {Card, Button, Table, Avatar} from "react-daisyui";

import QafuImg from '@public/assets/qq/qq-300.png';
import SymImg from '@public/assets/sym/sym-300.png';
import MondoImg from '@public/assets/mondo/mondo-300.png';

import Home_V1 from "./home_v1";

type Props = {
  // Add custom props here
}

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  // Translations
  const { t } = useTranslation('common');
  return (
    // <><Home_V1/></>
    <section className="flex flex-col place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {/* <svg className="fill-secondary h-auto w-full" width="1600" height="595" viewBox="0 0 1600 595" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path></svg> */}
          <Card compact className="bg-base-200 shadow-xl glass">
            <Card.Image className='p-0 object-scale-down h-full w-full'
                src={QafuImg.src}
                alt="Qafu Qatar"
            />
            <Card.Body className='place-items-center !p-0'>
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                Qafu Qatar
              </h1>
              <h4 className="text-primary/80 text-sm mb-2">
                Commuunity generated NFT collection
              </h4>
            </Card.Body>
            <Card.Actions className="justify-center">
                    <Button color={'accent'} variant={'outline'} size={"sm"} className=" w-[80%] mb-4"
                      onClick={() => { router.push(`/qafu-qatar/`); }}>
                      Mint Now for free
                    </Button>
            </Card.Actions>
          </Card>

          <Card compact className="bg-base-200 shadow-xl glass">
            {/* <Card.Title>h2</Card.Title> */}
            <Card.Image className='p-0 object-scale-down h-full w-full'
                src={SymImg.src}
                alt="Sym Token"
            />            
            <Card.Body className='place-items-center !p-0'>
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                Sym Token
              </h1>
              <h4 className="text-primary/80 text-sm mb-2">
                Airdropping Now
              </h4>
            </Card.Body>
            <Card.Actions className="justify-center">
                    <Button color={'accent'} variant={'outline'} size={"sm"} className=" w-[80%] mb-4"
                      onClick={() => { router.push(`/tokens/sym/`); }}>
                      Claim your free tokens
                    </Button>
            </Card.Actions>
          </Card>

          <Card compact className="bg-base-200 shadow-xl glass">
            {/* <Card.Title>h3</Card.Title> */}
            <Card.Image className='p-0 object-scale-down h-full w-full'
                src={MondoImg.src}
                alt="Mondo NFT"
            />
            <Card.Body className='place-items-center !p-0'>
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                Mondo NFT
              </h1>
              <h4 className="text-primary/80 text-sm mb-2">
                World Cup 2022 NFT Collection
              </h4>
            </Card.Body>
            <Card.Actions className="justify-center">
                    <Button color={'accent'} variant={'outline'} size={"sm"} className=" w-[80%] mb-4"
                      onClick={() => { router.push(`/mondo/`); }}>
                      Explore
                    </Button>
            </Card.Actions>
          </Card>

        </div>

      </div>

    </section>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const trans = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
      props: {
          ...trans,
      },
  }
}

export default Home
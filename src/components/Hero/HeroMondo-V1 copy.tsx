import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import { Hero, Card, Table, Button, Countdown } from "react-daisyui";

import HeroImg from '@public/images/mondo-hero-img-1.png'
import HeroBg from '@public/images/qq-hero-bg-1.png'
import { useBalance, useContract, Web3Button } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { BigNumber, utils } from "ethers";

// Just Quick for Luanch, bettrer to use a /mondo/claim.tsx
// const HeroSym = function HeroSym() {
const HeroMondo: React.FC<{
    isFreeGasCountry?: string;

}> = ({ isFreeGasCountry }) => {
    const { t } = useTranslation('common');

    const { contract } = useContract(process.env.NEXT_PUBLIC_BFT_DROP_MONDO_ADDRESS, "nft-drop")

    ///
    const amountToClaim = BigNumber.from(1_000);


    const tokenAddress = process.env.NEXT_PUBLIC_BFT_DROP_MONDO_ADDRESS

    const balance = useBalance(tokenAddress);
    // const canClaim = isFreeGasCountry==='true' && balance?.data?.value.lt(amountToClaim);
    const canClaim = balance?.data?.value.lt(amountToClaim);
    // console.log("-- balance ", balance?.data?.displayValue);
    // console.log("-- canClaim ", canClaim);
    // console.log("-- amountToClaim ", amountToClaim.toString())

    const [value, setValue] = useState<number>(26);
    useEffect(() => {
        const timer = setTimeout(() => {
          setValue((v) => (v <= 0 ? value : v - 1))
        }, 1000)
    
        return () => {
          clearTimeout(timer)
        }
      }, [value])

    return (
        <Hero
            className="hero min-h-fit text-primary place-items-start"
            style={{ backgroundImage: `url(/images/mondo-hero-bg-1.png)` }}
        >
            <Hero.Overlay className='bg-opacity-0' />

            <Hero.Content className="p-4 container mx-auto lg:px-28 md:px-20 sm:px-8 lg:my-20 md:my-14 sm:my-8">
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full pt-4'>
                    {/* Call out */}
                    <Card compact={true} bordered={false} className='order-last md:order-first lg:order-first'>
                        {/* <Card.Image src='/images/qq-title-1.png' alt="Qafu Qatar" className='pt-4 pr-10' >
                        </Card.Image>
                         */}
                        <Card.Title className="text-white place-items-start flex flex-col">
                            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-2">
                                {t('mondo.title')}
                            </h1>
                            <h4 className="text-white/60 font-extrabold text-lg sm:text-2xl lg:text-3xl">
                                {t('mondo.sub-title')}
                            </h4>
                        </Card.Title>
                        <Card.Body className='!p-0 !pb-2'>
                            <ul className="steps steps-vertical text-lg text-white">
                                {/* https://github.com/saadeghi/daisyui/issues/825#issuecomment-1141952076 */}
                                <li>
                                    {canClaim ? (

                                        <><span>You are eligable to claim {amountToClaim.toString()} mondo Tokens for free</span></>

                                    ) : (
                                        <><span>You already claimed your {balance?.data?.displayValue} free mondo Tokens</span></>
                                    )}
                                </li>
                                {/* <li data-content="2" className="step after:!w-6 after:!h-6 !min-h-8">{t('mondo.step-2')}</li>
                                <li data-content="3" className="step after:!w-6 after:!h-6 !min-h-8">{t('mondo.step-3')}</li> */}
                            </ul>
                            <p> </p>
                            {/* Count Down */}
                            <Card.Actions className="justify-end">
                                <div className="flex flex-1 space-x-2 lg:justify-start">

                                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                            <Countdown className="font-mono text-5xl" value={4} />
                                            days
                                        </div>
                                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                            <Countdown className="font-mono text-5xl" value={10} />
                                            hours
                                        </div>
                                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                            <Countdown className="font-mono text-5xl" value={24} />
                                            min
                                        </div>
                                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                            <Countdown className="font-mono text-5xl" value={value} />
                                            sec
                                        </div>
                                    </div>


                                </div>
                            </Card.Actions>
                        </Card.Body>
                    </Card>
                    {/* Image */}
                    <Card compact={true} bordered={false} imageFull className="[&.card]:before:opacity-0 order-first md:order-last lg:order-last">
                        <Card.Image className='p-2'
                            src={HeroImg.src}
                            alt="Qafu Qatar"
                        />
                    </Card>
                </div>

            </Hero.Content>
        </Hero>
    );
}

export default HeroMondo;

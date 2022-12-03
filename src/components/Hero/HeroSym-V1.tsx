import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import {Hero, Card, Table, Button} from "react-daisyui";

import HeroImg from '@public/images/sym-hero-img-2.png'
import HeroBg from '@public/images/qq-hero-bg-1.png'
import { useBalance, Web3Button } from '@thirdweb-dev/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { BigNumber, utils } from "ethers";

// Just Quick for Luanch, bettrer to use a /sym/claim.tsx
// const HeroSym = function HeroSym() {
const HeroSym: React.FC<{
    isFreeGasCountry?: string;
    
    }> = ({ isFreeGasCountry}) => {
    const { t } = useTranslation('common');

    const amountToClaim = BigNumber.from(15_000_000_000);
    // const amountToClaim = BigNumber.from(20_000);


    const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_DROP_SYM_ADDRESS
   
    const balance = useBalance(tokenAddress);
    // const canClaim = isFreeGasCountry==='true' && balance?.data?.value.lt(amountToClaim);
    const canClaim = true;// balance?.data?.value.lt(amountToClaim);
    console.log("-- balance ", balance?.data?.displayValue);
    console.log("-- canClaim ", canClaim);
    console.log("-- amountToClaim ", amountToClaim.toString())

    return (
        <Hero 
            className="hero min-h-fit text-primary place-items-start"
            style={{ backgroundImage: `url(/images/sym-hero-bg-2.png)`}}
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
                                {t('sym.title')}
                            </h1>
                            <h4 className="text-white/60 font-extrabold text-lg sm:text-2xl lg:text-3xl">
                                {t('sym.sub-title')}
                            </h4>
                        </Card.Title>
                        <Card.Body className='!p-0 !pb-2'>
                            <ul className="steps steps-vertical text-lg text-white">
                                {/* https://github.com/saadeghi/daisyui/issues/825#issuecomment-1141952076 */}
                                <li>
                                    {canClaim ? (
                                        
                                        <><span>You are eligable to claim {amountToClaim.toString()} Sym Tokens for free</span></>
                                        
                                    ):(
                                        <><span>You already claimed your {balance?.data?.displayValue} free Sym Tokens!</span></>
                                    )
                                    }
                                </li>
                                {/* <li data-content="2" className="step after:!w-6 after:!h-6 !min-h-8">{t('sym.step-2')}</li>
                                <li data-content="3" className="step after:!w-6 after:!h-6 !min-h-8">{t('sym.step-3')}</li> */}
                            </ul>
                            <p> </p>
                            <Card.Actions className="justify-end">
                                <div className="flex flex-1 space-x-2 lg:justify-start">

                                <Web3Button className='btn btn-lg btn-primary btn-xs md:btn-sm lg:btn-md xl:btn-lg'
                                    isDisabled={!canClaim}
                                    accentColor="#2AFFC0"
                                    colorMode="dark"
                                    contractAddress={tokenAddress}
                                    action={async (contract) => {
                                        // if (canClaim) {
                                            await contract.erc20.claim(amountToClaim.toString())
                                           
                                        // } else {
                                        //     toast.error("You already claimed the tokens", {
                                        //         position: toast.POSITION.TOP_CENTER, toastId: "claimed-already"
                                        //     });
                                        //     return;
                                        // }
                                        
                                    }}

                                    onSuccess={() => {
                                        // if (canClaim) {
                                            toast.success("Congratulations, You now own "+ amountToClaim.toString() + " Sym", {
                                                position: toast.POSITION.TOP_CENTER, toastId: "claim-sucess"
                                            });
                                            // Redirect to My Assets page
                                            router.push(`/my/assets`);
                                        // }
                                    }}

                                    onError={(err) => {
                                        console.log(err);
                                        toast.error("An error occured or you've rejected the transaction!", {
                                            position: toast.POSITION.TOP_CENTER, toastId: "claim-error"
                                        });
                                    }}
                                    >
                                    {t('sym.cta-button')}
                                </Web3Button>

                                {/* <Button responsive animation color={"primary"} size={"lg"} href="/tokens/sym/claim">
                                    {t('qafu.cta-button')}
                                </Button> */}


                                <Button responsive animation color={"ghost"}  variant={"outline"} size={"lg"} href="/qafu-qatar/info">
                                    {t('sym.info-button')}
                                </Button>
                                </div>
                            </Card.Actions>
                        </Card.Body>
                    </Card>
                    {/* Image */}
                    <Card compact={true} bordered={false}  imageFull className="[&.card]:before:opacity-0 order-first md:order-last lg:order-last">
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

export default HeroSym;

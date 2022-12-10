import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import { Hero, Card, Table, Button, Countdown } from "react-daisyui";

import HeroImg from '@public/images/mondo-hero-img-1.png'
import HeroBg from '@public/images/qq-hero-bg-1.png'
import { useActiveClaimConditionForWallet, useAddress, useNFTBalance, useClaimConditions, useClaimedNFTSupply, useClaimerProofs, useClaimIneligibilityReasons, useContract, useContractMetadata, useUnclaimedNFTSupply, Web3Button } from '@thirdweb-dev/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { BigNumber, utils } from "ethers";
import { parseIneligibility } from '@utils/parseIneligibility';
import { hextoNum } from '@utils/web3utils';

// Just Quick for Luanch, bettrer to use a /mondo/claim.tsx
// const HeroSym = function HeroSym() {
const HeroMondo: React.FC<{
    isFreeGasCountry?: string;

}> = ({ isFreeGasCountry }) => {
    const { t } = useTranslation('common');

    const { contract } = useContract(process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS, "nft-drop")

    const address = useAddress();

    // const { data: ownerBalance, isLoading: isLoadingBalance, error } = useNFTBalance(nftDrop, address);

    // console.log("ownerBalance", ownerBalance.toNumber());
    
    const [quantity, setQuantity] = useState(1);
    const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  
      



    ///
    //const amountToClaim = BigNumber.from(1_000);


    // const { data: canClaim, isLoading: isLoadingClaim, error: errorClaim } = useActiveClaimConditionForWallet(contract, address);
    // console.log("canClaim", canClaim);
    const canClaim = true;
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
                                {/* {t('mondo.sub-title')} */}
                                Airdroping Now...
                            </h4>
                        </Card.Title>
                        <Card.Body className='!p-0 !pb-2'>
                            <ul className="steps steps-vertical text-lg text-white">
                                {/* https://github.com/saadeghi/daisyui/issues/825#issuecomment-1141952076 */}
                                <li>
                                    {canClaim ? (

                                        <><span>You are eligable to claim One Mondo NFT for free</span></>

                                    ) : (
                                        <><span>You already claimed your free mondo NFT</span></>
                                    )}
                                </li>
                                {/* <li data-content="2" className="step after:!w-6 after:!h-6 !min-h-8">{t('mondo.step-2')}</li>
                                <li data-content="3" className="step after:!w-6 after:!h-6 !min-h-8">{t('mondo.step-3')}</li> */}
                            </ul>
                            <p> </p>
                            {/* Count Down */}
                            <Card.Actions className="justify-end">
                                <div className="flex flex-1 space-x-2 lg:justify-start">
                                    <Web3Button className='btn btn-lg btn-primary btn-xs md:btn-sm lg:btn-md xl:btn-lg'
                                        isDisabled={!canClaim || alreadyClaimed }
                                        accentColor="#2AFFC0"
                                        colorMode="dark"
                                        contractAddress={contract?.getAddress() || ""}
                                        // action={(cntr) => cntr.erc721.claim(quantity)}

                                        action={ async () => {
                                        //   console.log("action...");
                                          const balance = await contract.balanceOf(address);
                                        //   console.log("balance", balance.toNumber());
                                          if(balance.toNumber() >=1) {
                                            setAlreadyClaimed(true);
                                            
                                            toast.error("You already claimed the your free Mondo NFT", {
                                                position: toast.POSITION.TOP_CENTER, toastId: "claimed-already"
                                            });

                                          } else {
                                            const tx = await contract.erc721.claim(1);
                                            if(tx) {
                                              const claimedTokenId = tx[0].id;
                                            //   console.log("result", tx);
                                            //   console.log("claimedTokenId", claimedTokenId);
                                              
                                              setQuantity(1);
                                                toast.success("Congratulations, You now own 1 Mondo NFT", {
                                                    position: toast.POSITION.TOP_CENTER, toastId: "claim-sucess"
                                                });
                                                // Redirect to My Assets page
                                                router.push(`/mondo/mint-thanks/?contractAddress=${process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS}&tokenId=${claimedTokenId}`);
                                            }

                                          }}}


                                        onError={(err) => {
                                            console.log(err);
                                            toast.error("An error occured or you've rejected the transaction!", {
                                                position: toast.POSITION.TOP_CENTER, toastId: "claim-error"
                                            });
                                        }}
                                        >
                                        {t('sym.cta-button')}
                                        {/* {buttonLoading ? "Loading..." : buttonText} */}
                                    </Web3Button>


                                </div>
                            </Card.Actions>
                        </Card.Body>
                    </Card>
                    {/* Image */}
                    <Card compact={true} bordered={false} imageFull className="[&.card]:before:opacity-0 order-first md:order-last lg:order-last">
                        <Card.Image className='p-2'
                            src={HeroImg.src}
                            alt="Mondo NFT"
                        />
                    </Card>
                </div>

            </Hero.Content>
        </Hero>
    );
}

export default HeroMondo;

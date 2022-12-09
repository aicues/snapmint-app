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

    const { contract: nftDrop  } = useContract(process.env.NEXT_PUBLIC_NFT_DROP_MONDO_ADDRESS, "nft-drop")

    const address = useAddress();

    // const { data: ownerBalance, isLoading: isLoadingBalance, error } = useNFTBalance(nftDrop, address);

    // console.log("ownerBalance", ownerBalance.toNumber());
    
    const [quantity, setQuantity] = useState(1);
    // const [balance, setBalance] = useState(BigNumber.from(0));

    const { data: contractMetadata } = useContractMetadata(nftDrop);

    const claimConditions = useClaimConditions(nftDrop);

    const activeClaimCondition = useActiveClaimConditionForWallet(
        nftDrop,
        address || ""
    );
    const claimerProofs = useClaimerProofs(nftDrop, address || "");
    const claimIneligibilityReasons = useClaimIneligibilityReasons(nftDrop, {
        quantity,
        walletAddress: address || "",
    });
    const unclaimedSupply = useUnclaimedNFTSupply(nftDrop);
    const claimedSupply = useClaimedNFTSupply(nftDrop);


    const numberClaimed = useMemo(() => {
        return BigNumber.from(claimedSupply.data || 0).toString();
      }, [claimedSupply]);
    
      const numberTotal = useMemo(() => {
        return BigNumber.from(claimedSupply.data || 0)
          .add(BigNumber.from(unclaimedSupply.data || 0))
          .toString();
      }, [claimedSupply.data, unclaimedSupply.data]);
    
      const priceToMint = useMemo(() => {
        const bnPrice = BigNumber.from(
          activeClaimCondition.data?.currencyMetadata.value || 0
        );
        return `${utils.formatUnits(
          bnPrice.mul(quantity).toString(),
          activeClaimCondition.data?.currencyMetadata.decimals || 18
        )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
      }, [
        activeClaimCondition.data?.currencyMetadata.decimals,
        activeClaimCondition.data?.currencyMetadata.symbol,
        activeClaimCondition.data?.currencyMetadata.value,
        quantity,
      ]);
    
      const maxClaimable = useMemo(() => {
        let bnMaxClaimable;
        try {
          bnMaxClaimable = BigNumber.from(
            activeClaimCondition.data?.maxClaimableSupply || 0
          );
        } catch (e) {
        //   bnMaxClaimable = BigNumber.from(1_000_000);
        bnMaxClaimable = BigNumber.from(1);
        }
    
        let perTransactionClaimable;
        try {
          perTransactionClaimable = BigNumber.from(
            activeClaimCondition.data?.maxClaimablePerWallet || 0
          );
        } catch (e) {
            //perTransactionClaimable = BigNumber.from(1_000_000);
            perTransactionClaimable = BigNumber.from(1);
        }
    
        if (perTransactionClaimable.lte(bnMaxClaimable)) {
          bnMaxClaimable = perTransactionClaimable;
        }
    
        const snapshotClaimable = claimerProofs.data?.maxClaimable;
    
        if (snapshotClaimable) {
          if (snapshotClaimable === "0") {
            // allowed unlimited for the snapshot
            // bnMaxClaimable = BigNumber.from(1_000_000);
            bnMaxClaimable = BigNumber.from(1);
          } else {
            try {
              bnMaxClaimable = BigNumber.from(snapshotClaimable);
            } catch (e) {
              // fall back to default case
            }
          }
        }
    
        const maxAvailable = BigNumber.from(unclaimedSupply.data || 0);

    
        let max;
        if (maxAvailable.lt(bnMaxClaimable)) {
          max = maxAvailable;
        } else {
          max = bnMaxClaimable;
        }
    
        if (max.gte(1_000_000)) {
        //   return 1_000_000;
            return 1;
        }
        return max.toNumber();
      }, [
        claimerProofs.data?.maxClaimable,
        unclaimedSupply.data,
        activeClaimCondition.data?.maxClaimableSupply,
        activeClaimCondition.data?.maxClaimablePerWallet,
      ]);
    
      const isSoldOut = useMemo(() => {
        try {
          return (
            (activeClaimCondition.isSuccess &&
              BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
                0
              )) ||
            numberClaimed === numberTotal
          );
        } catch (e) {
          return false;
        }
      }, [
        activeClaimCondition.data?.availableSupply,
        activeClaimCondition.isSuccess,
        numberClaimed,
        numberTotal,
      ]);

      
    
     //console.log("claimIneligibilityReasons", claimIneligibilityReasons.data);
     // console.log("claimIneligibilityReasons", claimIneligibilityReasons.isSuccess);
    
    //  useEffect(async () => {
    //   const balance =  await nftDrop.balanceOf(address);

  
    // }, [address, nftDrop]);
      
    // useEffect(() => {
    //   async function fetchData() {
    //     console.log("Fetching Balance..");
    //     const balance = await nftDrop?.balanceOf(address);
    //     setBalance(balance);
    //   }
    //   fetchData();
    // }, [address, nftDrop]); // Or [] if effect doesn't need props or state
    
    //   console.log(balance);

      const canClaim = useMemo(() => {
        return (
          activeClaimCondition.isSuccess &&
          claimIneligibilityReasons.isSuccess &&
          claimIneligibilityReasons.data?.length === 0 &&
          !isSoldOut
        );
      }, [
        activeClaimCondition.isSuccess,
        claimIneligibilityReasons.data?.length,
        claimIneligibilityReasons.isSuccess,
        isSoldOut,
      ]);

      const isLoading = useMemo(() => {
        return (
          activeClaimCondition.isLoading ||
          unclaimedSupply.isLoading ||
          claimedSupply.isLoading ||
          !nftDrop
        );
      }, [
        activeClaimCondition.isLoading,
        nftDrop,
        claimedSupply.isLoading,
        unclaimedSupply.isLoading,
      ]);
    
      const buttonLoading = useMemo(
        () => isLoading || claimIneligibilityReasons.isLoading,
        [claimIneligibilityReasons.isLoading, isLoading]
      );
      const buttonText = useMemo(() => {
        if (isSoldOut) {
          return "Sold Out";
        }
    
        if (canClaim) {
          const pricePerToken = BigNumber.from(
            activeClaimCondition.data?.currencyMetadata.value || 0
          );
          if (pricePerToken.eq(0)) {
            return "Mint (Free)";
          }
          return `Mint (${priceToMint})`;
        }
        if (claimIneligibilityReasons.data?.length) {
          return parseIneligibility(claimIneligibilityReasons.data, quantity);
        }
        if (buttonLoading) {
          return "Checking eligibility...";
        }
    
        return "Claiming not available";
      }, [
        isSoldOut,
        canClaim,
        claimIneligibilityReasons.data,
        buttonLoading,
        activeClaimCondition.data?.currencyMetadata.value,
        priceToMint,
        quantity,
      ]);


    ///
    //const amountToClaim = BigNumber.from(1_000);


    //const tokenAddress = process.env.NEXT_PUBLIC_BFT_DROP_MONDO_ADDRESS

    //const balance = useBalance(tokenAddress);
    // const canClaim = isFreeGasCountry==='true' && balance?.data?.value.lt(amountToClaim);
    //// canClaim = balance?.data?.value.lt(amountToClaim);
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
                                        isDisabled={!canClaim || buttonLoading}
                                        accentColor="#2AFFC0"
                                        colorMode="dark"
                                        contractAddress={nftDrop?.getAddress() || ""}
                                        action={(cntr) => cntr.erc721.claim(quantity)}

                                        onSuccess={() => {
                                            // if (canClaim) {
                                                setQuantity(1);
                                                toast.success("Congratulations, You now own 1 Mondo NFT", {
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
                                        {/* {t('sym.cta-button')} */}
                                        {buttonLoading ? "Loading..." : buttonText}
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

import type { NextPage, GetStaticProps, InferGetStaticPropsType, GetServerSideProps} from "next";
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTokenSupply,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { useMemo, useState } from "react";
// import styles from "../styles/Home.module.css";
import { parseIneligibility } from "@utils/parseIneligibility";
import { hextoNum } from "@utils/web3utils";

import {Card, Button, Table, Avatar} from "react-daisyui";

type Props = {
  // Add custom props 
  isFreeGasCountry: string
}

/// Based on https://github.com/thirdweb-example/token-drop and https://blog.thirdweb.com/announcing-improved-claim-conditions/
// NEED to understand it first before using it

const ClaimSym = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {


    const t = useTranslation("common");
    const myProps = props as Awaited<Props>

    const tokenAddress  = process.env.NEXT_PUBLIC_TOKEN_DROP_SYM_ADDRESS
    const { contract } = useContract(tokenAddress, "token-drop");
    const address = useAddress();
    const [quantity, setQuantity] = useState(1);
    const { data: contractMetadata } = useContractMetadata(contract);
  
    const claimConditions = useClaimConditions(contract);
    const activeClaimCondition = useActiveClaimConditionForWallet(
      contract,
      address
    );
    console.log("activeClaimCondition ", activeClaimCondition?.data?.maxClaimablePerWallet)

    const claimerProofs = useClaimerProofs(contract, address || "");
    const claimIneligibilityReasons = useClaimIneligibilityReasons(contract, {
      quantity,
      walletAddress: address || "",
    });
  
    const claimedSupply = useTokenSupply(contract);

    // How many tokens will you drop in this phase ?
    const totalAvailableSupply = useMemo(() => {
      try {
        return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
      } catch {
        return BigNumber.from(1_000_000_000_000);
      }
    }, [activeClaimCondition.data?.availableSupply]);


    console.log("totalAvailableSupply ", hextoNum(totalAvailableSupply))

    const numberClaimed = useMemo(() => {
      return BigNumber.from(claimedSupply.data?.value || 0).toString();
    }, [claimedSupply]);
  
    const numberTotal = useMemo(() => {
      const n = totalAvailableSupply.add(
        BigNumber.from(claimedSupply.data?.value || 0)
      );
      if (n.gte(1_000_000_000_000)) {
        return "";
      }
      return n.toString();
    }, [totalAvailableSupply, claimedSupply]);
  
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
        bnMaxClaimable = BigNumber.from(20_000);
      }
  
      let perTransactionClaimable;
      try {
        perTransactionClaimable = BigNumber.from(
          activeClaimCondition.data?.maxClaimablePerWallet || 0
        );
      } catch (e) {
        perTransactionClaimable = BigNumber.from(1_000_000_000);
      }
  
      if (perTransactionClaimable.lte(bnMaxClaimable)) {
        bnMaxClaimable = perTransactionClaimable;
      }
  
      const snapshotClaimable = claimerProofs.data?.maxClaimable;
  
      if (snapshotClaimable) {
        if (snapshotClaimable === "0") {
          // allowed unlimited for the snapshot
          bnMaxClaimable = BigNumber.from(20_000);
        } else {
          try {
            bnMaxClaimable = BigNumber.from(snapshotClaimable);
          } catch (e) {
            // fall back to default case
          }
        }
      }
  
      let max;
      if (totalAvailableSupply.lt(bnMaxClaimable)) {
        max = totalAvailableSupply;
      } else {
        max = bnMaxClaimable;
      }
  
      if (max.gte(1_000_000_000)) {
        return 1_000_000_000;
      }
      return max.toNumber();
    }, [
      claimerProofs.data?.maxClaimable,
      totalAvailableSupply,
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
      return activeClaimCondition.isLoading || !contract;
    }, [activeClaimCondition.isLoading, contract]);
  
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
  
  



    return (
      <section className="flex flex-col place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max">

        <Card compact className="bg-base-200 shadow-xl">
          {(claimConditions.data &&
            claimConditions.data.length > 0 &&
            activeClaimCondition.isError) ||
            (activeClaimCondition.data &&
              activeClaimCondition.data.startTime > new Date() && (
                <Card.Title>Drop is starting soon. Please check back later.</Card.Title>
            ))}
            {claimConditions.data?.length === 0 ||
            (claimConditions.data?.every((cc) => cc.maxClaimableSupply === "0") && (
              <Card.Title>
                This drop is not ready to be minted yet. (No claim condition set)
              </Card.Title>
            ))}

            {isLoading ? (
                <Card.Title>Loading</Card.Title>
              ) : (
                <>
                  <Card.Title>Claim {contractMetadata?.name} ERC20 </Card.Title>
                  {contractMetadata?.image && (
                    <Image
                      src={contractMetadata?.image}
                      alt={contractMetadata?.name!}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                    />
                  )}

                  <Card.Body className='place-items-center'>
                    <div className='p-8'>
                     Max Claimable: {maxClaimable.toLocaleString("en-US")}
                    </div>
                    <div className='p-8'>
                        <input
                          type="number"
                          min={1}
                          placeholder="Enter amount to claim"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            console.log(maxClaimable);
                            if (value > maxClaimable) {
                              setQuantity(maxClaimable);
                            } else if (value < 1) {
                              setQuantity(1);
                            } else {
                              setQuantity(value);
                            }
                          }}
                          value={quantity}
                          className='input input-bordered w-full'
                        />
                    </div>
                  </Card.Body>

                  <Card.Actions className="justify-center">
                      <Web3Button
                        accentColor="#5204BF"
                        colorMode="dark"
                        contractAddress={tokenAddress}
                        action={(contract) => contract.erc20.claim(quantity)}
                        onSuccess={() => alert("Claimed!")}
                        onError={(err) => alert(err)}
                        >
                        {buttonText}
                      </Web3Button>
                  </Card.Actions>
                  


                </>
              )}

            
          </Card>



      </section>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, query }) => {
  
    const trans = await serverSideTranslations(locale ?? "en", ["common"]);
    return {
        props: {
            isFreeGasCountry: query?.isFreeGasCountry as  string,
            ...trans,
        },
    }
  }

export default ClaimSym;
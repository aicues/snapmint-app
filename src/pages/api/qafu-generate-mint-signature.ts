import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { AwsKmsWallet } from "@thirdweb-dev/sdk/evm/wallets";
import type { NextApiRequest, NextApiResponse } from "next";
import {targetChainString} from '@config/targetChainConfig';
import { AwsKmsSigner } from "ethers-aws-kms-signer";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
// import animalNames from "../../animalNames";
// import "../styles/globals.css";



export default async function qafuGenerateMintSignature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // De-structure the arguments we passed in out of the request body
    const {nftName, authorAddress, imagePath, description, properties } = JSON.parse(req.body);

    console.log("--authorAddress", authorAddress);
    console.log("--nftName", nftName);
    // console.log("--imagePath", imagePath);

    // AWS Secerts Manager, this incures a cost
    // const secret_name = "Mumbai_Private_Key_Test";
    // const client = new SecretsManagerClient({
    //   region: "eu-central-1",
    // });
    // const response = await client.send(
    //   new GetSecretValueCommand({
    //     SecretId: secret_name,
    //     VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    //   })
    // );
    // const secret = response.SecretString;
    // console.log("---- secret", secret);
    

    // AWS KMS Wallet, gets generated private key from AWS KMS, how to use this with our own private key?
    // const wallet = new AwsKmsWallet({
    //   region: process.env.AWS_REGION,
    //   keyId: process.env.AWS_ACCESS_KEY_ARN,
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // });
    // const sdk1 = await ThirdwebSDK.fromWallet(
    //   wallet, 
    //   targetChainString
    // );
    // const address = await (await wallet.getSigner()).getAddress();
    // console.log("-- address:: ", address);

    // Lets's stick with the envairoment variable for now
    if (!process.env.PRIVATE_KEY) {
      throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
    }

    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY as string, 
      targetChainString
    );

    // Load the NFT Collection via it's contract address using the SDK
    const nftCollection = await sdk.getContract( process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS!, 'nft-collection');

    // Here we can make all kinds of cool checks to see if the user is eligible to mint the NFT.
    // Here are a few examples:

    // 1) Check that it's an animal name from our list of animal names
    // This demonstrates how we can restrict what kinds of NFTs we give signatures for
    // if (!animalNames.includes(nftName?.toLowerCase())) {
    //   res.status(400).json({ error: "That's not one of the animals we know!" });
    //   return;
    // }

    // 2) Check that this wallet hasn't already minted a page - 1 NFT per wallet
    // const hasMinted = (await nftCollection.balanceOf(authorAddress)).gt(0);
    // if (hasMinted) {
    //   res.status(400).json({ error: "Already minted" });
    //   return;
    // }

    // If all the checks pass, begin generating the signature...
    // Generate the signature for the page NFT
    const signedPayload = await nftCollection.signature.generate({
      to: authorAddress,
      mintStartTime: new Date(0),

      royaltyBps: 1000, // 10% royalty for the author,10%=1000bps 2.5% = 250bps and 100% = 10,000bps
      royaltyRecipient: authorAddress, //  royalty recipient for this NFT
      primarySaleRecipient: authorAddress, // primary sale recipient for this NFT  

      currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with
      // price: 0.01, // the price per NFT
      // mintEndTime: new Date(Date.now() + 60 * 60 * 24 * 1000), // to 24h from now
      // quantity: 2, // the quantity of NFTs to mint
      // price: 0.5, // the price per NFT
      // currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with
      // royaltyRecipient: "0x...", // custom royalty recipient for this NFT
      // royaltyBps: 100, // custom royalty fees for this NFT (in bps)
      // primarySaleRecipient: "0x...", // custom sale recipient for this NFT



      metadata: {
        name: nftName ,
        image: imagePath,
        description: description,
        properties: properties,
      },
    });

    // console.log("-----------");
    // console.log({
    //   signedPayloadStatus: signedPayload.payload,
    //   signedPayloadSignature: signedPayload.signature,
    // });
    // console.log("-----------");

    // Return back the signedPayload to the client.
    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    });
  } catch (e) {
    console.log(`-- Server error ${e}`);
    res.status(500).json({ error: `Server error ${e}` });
  }
}

import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import {targetChainString} from '@config/targetChainConfig';
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

    




    // You'll need to add your private key in a .env.local file in the root of your project
    // !!!!! NOTE !!!!! NEVER LEAK YOUR PRIVATE KEY to anyone!
    if (!process.env.PRIVATE_KEY) {
      throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
    }

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Your wallet private key (read it in from .env.local file)
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

      // price: 0.01, // the price per NFT
      // currencyAddress: NATIVE_TOKEN_ADDRESS, // the currency to pay with

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
    console.log(`Server error ${e}`);
    res.status(500).json({ error: `Server error ${e}` });
  }
}

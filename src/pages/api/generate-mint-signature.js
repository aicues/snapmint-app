import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function generateMintSignature(req, res) {
  // De-construct body from 
  
  let { address, name, description, image } = JSON.parse(req.body);
  console.log("start api " + name);
  // const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
  const sdk = ThirdwebSDK.fromPrivateKey("2bf5338fb5857bdc100240a4ac1eb8f22c4ee55986c72668707a3d338c61992e", "mumbai");

  const nftContract = await sdk.getContract(
    "0xdeAE77dc5C3784e83602AD8E7ae82124c6C58c04",
    // process.env.COLLECTION_QAFU_ADDRESS,
    "nft-collection"
  );

  const signedPayload = await nftContract.signature.generate({
    metadata: {
      name: name,
      description: description,
      image: image,
    },
    to: address,
    mintStartTime: new Date(0),
  });

  console.log({
    signedPayloadStatus: signedPayload.status
  });

  // return 200 and signedpayload
  res.status(200).json({
    signedPayload: JSON.parse(JSON.stringify(signedPayload)),
  });
}

/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useRef, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from 'next/router'
// import { FileUploader } from "react-drag-drop-files";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  ThirdwebNftMedia,
  useAddress,
  useDisconnect,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useContract,
  useNFTs,
  useSDK,
  useSigner,
  useStorageUpload,
  Web3Button
} from "@thirdweb-dev/react";
import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { SmartContract } from "@thirdweb-dev/sdk";

import GenericForm, {FormProps  } from "@components/forms/GenericForm";
import {FieldValues, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import {INftCreate} from "@models";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Props = {
  // Add custom props here
}

const Create: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  // Translations
  const t = useTranslation('common');

  const router = useRouter();

  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS, "nft-collection" );
  // const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace" );
  const address = useAddress();
   // Hooks to detect user is on the right network and switch them if they are not
   const networkMismatch = useNetworkMismatch();
   const [, switchNetwork] = useNetwork();

  const { mutateAsync: upload } = useStorageUpload();

  // Here we store the user inputs for their NFT.
  // const [nftName, setNftName] = useState<string>("");
  const [file, setFile] = useState<File>();

  // Magic to get the file upload even though its hidden
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to store file in state when user uploads it
  const uploadFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();

      fileInputRef.current.onchange = () => {
        if (fileInputRef?.current?.files?.length) {
          const file = fileInputRef.current.files[0];
          setFile(file);
        }
      };
    }
  };

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
  const mintWithSignature: SubmitHandler<INftCreate> = async (data: INftCreate) => {
    try {
      // Prevent page from refreshing
      // e.preventDefault();

      if (!address ) {
        alert("Please connect your wallet.");
        return;
      }

      if (!file ) {
        alert("Please enter a name and upload a file.");
        return;
      }

      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork?.(ChainId.Mumbai);
        return;
      }

      

      // De-construct data from form submission
      //istingType,, price

/*       console.log({
        // listingType: listingType.value,
        eeee: e.currentTarget.elements
      }); */

      const { name, description } = data;

       // Upload image to IPFS using Storage
       const uris = await upload({ data: [file], });

      console.log({
        // listingType: listingType.value,
        nftName: name,
        description: description,
        authorAddress: address,
        uri: uris[0],
        // price: price.value,
      });

     

      // Make a request to /api/qafu-generate-mint-signature
      const signedPayloadReq = await fetch(`/api/qafu-generate-mint-signature`, {
        method: "POST",
        body: JSON.stringify({
          authorAddress: address, // Address of the current user
          nftName: name,
          imagePath: uris[0],
          description: description,
          properties: {
            // Add any properties you want to store on the NFT
            country:"Qatar",
            city: "Doha"
            }
        }),
      });

      // Grab the JSON from the response
      const json = await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        alert(json.error);
      }

      // If the request succeeded, we'll get the signed payload from the response.
      // The API should come back with a JSON object containing a field called signedPayload.
      // This line of code will parse the response and store it in a variable called signedPayload.
      const signedPayload = json.signedPayload;

      // Now we can call signature.mint and pass in the signed payload that we received from the server.
      // This means we provided a signature for the user to mint an NFT with.
      const nft = await nftCollection?.signature.mint(signedPayload);

     
      console.log({
        nft: nft
      });

      const mintedTokenId = nft?.id.toNumber();

      alert("Minted succesfully ? id= "  + mintedTokenId);

      return nft;
    } catch (e) {
      console.error("An error occurred trying to mint the NFT:", e);
    }
  };


  // Form --------------------------------------------------


  // zod: all properties are required by default
  const validationSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    authorAddress: z.string().optional(),
    description: z.string().min(1, { message: 'Required' }),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm<INftCreate>({ resolver: zodResolver(validationSchema) });


/* 
  const fields = [
    {type: "text", name: "name", required: true, label: "Name", placeholder:"Type here", className:""},
    // {type: "email", name: "email", required: true, label: "Email", autoComplete: "email"},
    {type: "textarea", name: "description", required: true, label: "Description", className: "textarea textarea-bordered h-24 w-full"},


    // {type: "text", name: "trait_type_1", required: false, label: "Trait", hidden:true},
    // {type: "text", name: "trait_type_1_value", required: false, label: "Trait Value", hidden:true},
    // {type: "text", name: "trait_type_2", required: false, label: "Trait", hidden:true},
    // {type: "text", name: "trait_type_2_value", required: false, label: "Trait Value", hidden:true},

    {type: "text", name: "authorAddress", required: false, hidden:false},
    //{type: "text", name: "imagePath", required: false, hidden:true},
  ]; */

  return (
  <form onSubmit={handleSubmit(mintWithSignature)} className="w-full">
    <div className="bg-base-200  flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:p-16 md:p-12 sm:p-8">
      
      {/* Left Card: Image */}
      <div className="card h-max w-full lg:w-1/3 bg-base-300 rounded-box place-items-start justify-start">
        <div className="card w-full bg-base-100 px-6 pt-6 shadow-xl ">

        {file ? (
          <figure>
            <img 
              src={URL.createObjectURL(file)}
              style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
              onClick={() => setFile(undefined)}
              alt=""
              className="rounded-xl" />
          </figure>
        ) : (
          <>
            <div 
              className="card cursor-pointer inline-block items-center text-center align-middle w-full h-44 bg-base-200 text-base-200 p-8 border-dashed border-2 border-blue-600"
              onClick={uploadFile}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
            >
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" width="24" height="24"
                    className="mb-4 inline-block dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
              </svg>
              <p className="align-middle pb-4 mx-auto max-w-xs text-base text-gray-400">
                Click here to upload a file
              </p>
              <p className="align-middle mx-auto max-w-xs text-xs text-gray-400">
                Image, Video, or Audio file
              </p>
              <p className="align-middle  mx-auto max-w-xs text-xs text-gray-400">
                max size: 1 GB
              </p>
            </div>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, video/mp4, audio/mp3"
              id="profile-picture-input"
              ref={fileInputRef}
              style={{ display: "none" }}
            />  
          </>
        )}

          <div className="card-body items-center text-center">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="divider lg:divider-horizontal"></div>
      {/* Right Caard: Form fields */}
      <div className="card h-max w-full lg:w-2/3 bg-base-300 p-4 rounded-box place-items-start justify-start">
        {/* <GenericForm url="/api/qafu-generate-mint-signature" renderForm={renderForm} /> */}
        <ul className="w-full">
          <li key="name" className= "form-control w-full">
              <label className="label w-full" htmlFor="name">
                <span className="label-text">Name</span>
                <span className="label-text-alt">{errors["name"]?.message}</span>
              </label>
              <input type="text"
                  className =  "input input-bordered w-full"  
                  placeholder="Type here"
                  {...register( "name")} 
                />
          </li>
          <li key="description" className= "form-control w-full">
              <label className="label w-full" htmlFor="descriptionme">
                <span className="label-text">Description</span>
                <span className="label-text-alt">{errors["description"]?.message}</span>
              </label>
              <input type="textarea"
                  className =  "textarea textarea-bordered h-24 w-full"  
                  placeholder="Type here"
                  {...register( "description", {required: true})} 
                />
          </li>
          {/* <input type="hidden" value={address} {...register("authorAddress")} /> */}

        </ul>
        {/* <ul className="">
          {fields.map(field => 
          
              <li key={field.name} id={field.name}  className= "form-control w-full">
                <label className="label w-full" htmlFor={field.name}>
                  <span className="label-text">{field.label}</span>
                  <span className="label-text-alt">{errors[field.name]?.message}</span>
                </label>
                <input type={field.type}
                  className =  { field.className ? (field.className) : ("input input-bordered min-w-max placeholder:text-gray-400")}  
                  placeholder={field.placeholder} 
                  autoComplete={field.autoComplete}
                  {...register( field.name , {required: field.required})} 
                />
                <div className="text-error">{errors[field.name]?.message}</div>
              </li>
          )}
        </ul> */}
        <button type="submit" className="btn btn-primary m-3">
            Submit
        </button>
      </div>
      
    </div>
    </form>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common', 'footer']),
  },
})

export default Create;


/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useRef, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType, GetServerSideProps, NextPageContext } from "next";
import { useRouter } from 'next/router'
// import { FileUploader } from "react-drag-drop-files";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useContract,
  useNFTs,
  useSDK,
  useSigner,
  useStorageUpload,
  Web3Button
} from "@thirdweb-dev/react";
import { ChainId, NATIVE_TOKEN_ADDRESS, NFTMetadata } from "@thirdweb-dev/sdk";
import { SmartContract } from "@thirdweb-dev/sdk";

import {Button } from "react-daisyui";

import {FieldValues, useForm, useFieldArray, UseFormRegister, SubmitHandler } from "react-hook-form";
import {INftCreate} from "@models";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "react-toastify";

type Props = {
  // Add custom props here
  countryName: string,
  city: string,
}

// const Create: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const Create: NextPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {

    // console.log("props:", props)
  // Translations
  const { t }= useTranslation('common');

  const myProps = props as Awaited<Props>// string
  console.log(myProps.countryName);
  // alert("Hello from " + myProps.country)

  const router = useRouter();

  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS, "nft-collection" );
  // const { contract: marketplace } = useContract( process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS, "marketplace" );
  const address = useAddress();
   // Hooks to detect user is on the right network and switch them if they are not
   const networkMismatch = useNetworkMismatch();
   const [, switchNetwork] = useNetwork();

  const { mutateAsync: upload } = useStorageUpload();


  const [submitting, setSubmitting] = useState(false);

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
          // console.log("file", file);
          setFile(file);
        }
      };
    }
  };

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
  const mintWithSignature: SubmitHandler<INftCreate> = async (data: INftCreate) => {
    try {

      if (!file ) {
        toast.error("Please select a media file to upload !", {
          position: toast.POSITION.TOP_CENTER, toastId: "mint-media-error"
        });
        return;
      }

      if (!address ) {
        toast.error("Please connect your Wallet!", {
          position: toast.POSITION.TOP_CENTER, toastId: "wallet-error"
        });
        return;
      }

      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Mumbai);
        return;
      }

      

      // De-construct data from form submission
      //istingType,, price

/*       console.log({
        // listingType: listingType.value,
        eeee: e.currentTarget.elements
      }); */

      setSubmitting(true);

      const { name, description, traits } = data;

       // Upload image to IPFS using Storage
       const uris = await upload({ data: [file], });

      // console.log({
      //   // listingType: listingType.value,
      //   nftName: name,
      //   description: description,
      //   authorAddress: address,
      //   uri: uris[0],
      //   // price: price.value,
      // });

     

      //transform traits to json array, ref: https://stackoverflow.com/a/48102871/365469
      const traitsAsProperties = traits.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});


      // Make a request to /api/qafu-generate-mint-signature
      const signedPayloadReq = await fetch(`/api/qafu-generate-mint-signature`, {
        method: "POST",
        body: JSON.stringify({
          authorAddress: address, // Address of the current user
          nftName: name,
          imagePath: uris[0],
          description: description,
          properties: traitsAsProperties
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

     
      // console.log({ nft: nft });

      const mintedTokenId = nft?.id.toNumber();

      // alert("Minted succesfully ? id= "  + mintedTokenId);

      toast.success("NFT #"+ mintedTokenId+" Minted succesfully, Now you may list it in the Marketplace !", {
        position: toast.POSITION.TOP_CENTER, toastId: "mint-success"
      });

      setSubmitting(false);

      // Redirect to the NFT page
      router.push(
        `/market/create-listing/?contractAddress=${process.env.NEXT_PUBLIC_COLLECTION_QAFU_ADDRESS}&tokenId=${mintedTokenId}`
        // `/market/create-listing/?tokenId=${id}`
        // `/market/create-listing/${address}?tokenId=${id}`
      );

      // return nft;
    } catch (e) {
      setSubmitting(false);
      toast.error("An error occurred trying to mint the NFT, Please Try Again !", {
        position: toast.POSITION.TOP_CENTER, toastId: "mint-error"
      });
      // console.error("An error occurred trying to mint the NFT:", e);
    }
  };


  // Form --------------------------------------------------


  // zod: all properties are required by default
  const validationSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    authorAddress: z.string().optional(),
    description: z.string().min(1, { message: 'Required' }),
    traits: z.array(z.object({
      name: z.string(), 
      value: z.string()
    })).optional(),
  });

  const { register, control, handleSubmit, formState: { errors }, } = useForm<INftCreate>({ 
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
    traits: [{ name: "Country", value: myProps.countryName }, { name: "City", value: myProps.city }]
    } as INftCreate
  });
  // dynamic fields, ref: https://react-hook-form.com/api/usefieldarray/
  const { fields, remove, append } = useFieldArray({
    control,
    name: "traits"
  });


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
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body p-4" >
            <h2 className="card-title">{t('create-nft.media-title')}</h2>
          </div>

          <div className="p-4 pt-0">
            {file ? (

              file.type.includes("video") ? 
              (
                <figure>
                  <video src={URL.createObjectURL(file)}
                    style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
                    onClick={() => setFile(undefined)}
                    // alt=""
                    className="rounded-xl" />
                </figure>
              ) : (
                <figure>
                  <img src={URL.createObjectURL(file)}
                    style={{ cursor: "pointer", maxHeight: 250, borderRadius: 8 }}
                    onClick={() => setFile(undefined)}
                    alt=""
                    className="rounded-xl" />
                </figure>
              )

            ) : (
              <>
                <div 
                  className="card cursor-pointer inline-block items-center text-center align-middle w-full h-44 bg-base-300 text-base-200 p-8 border-primary border-dashed border"
                  onClick={uploadFile}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }}
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
                    {t('create-nft.media-info-uploadfile')}
                  </p>
                  <p className="align-middle mx-auto max-w-xs text-xs text-gray-400">
                    {t('create-nft.media-info-files')}
                  </p>
                  <p className="align-middle  mx-auto max-w-xs text-xs text-gray-400">
                    {t('create-nft.media-info-files-size')}
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
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="divider lg:divider-horizontal"></div>
      {/* Right Caard: Form fields */}
      <div className="card h-max w-full lg:w-2/3 bg-base-300 p-4 rounded-box place-items-start justify-start">
        {/* <GenericForm url="/api/qafu-generate-mint-signature" renderForm={renderForm} /> */}
        <h2 className="card-title">{t('create-nft.meta-title')}</h2>
        {/* <h3>Hello from {myProps.countryName}</h3> */}
        <ul className="w-full">
          <li key="name" className= "form-control w-full">
              <label className="label w-full" htmlFor="name">
                <span className="label-text">{t('create-nft.meta-name')}</span>
                <span className="label-text-alt text-error">{errors["name"]?.message}</span>
              </label>
              <input type="text"
                  className =  "input input-bordered w-full"  
                  placeholder={t('create-nft.meta-name-placeholder')}
                  {...register( "name")} 
              />
          </li>

          <li key="description" className= "form-control w-full mt-4">
              <label className="label w-full" htmlFor="descriptionme">
                <span className="label-text">{t('create-nft.meta-description')}</span>
                <span className="label-text-alt text-error">{errors["description"]?.message}</span>
              </label>
              <textarea 
                  className =  "textarea textarea-bordered w-full resize-none"  
                  placeholder={t('create-nft.meta-description-placeholder')}
                  {...register( "description", {required: true})} 
                />
          </li>
        </ul>
        {/* Properties */}
        <div className="card-body px-0 w-full" >
            <h2 className="card-title">{t('create-nft.meta-trait-title')}</h2>
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th className="w-1/3 text-xs">{t('create-nft.meta-trait-type')}</th> 
                  <th className="w-2/3 text-xs">{t('create-nft.meta-trait-value')}</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index)=> (
                  <tr key={index}>
                    <td>
                    <input type="text"
                        className =  "input input-bordered w-full input-sm"  
                        placeholder={t('create-nft.meta-trait-type-placeholder')}
                        {...register(`traits.${index}.name` as const, { required: false})} 
                      />

                    </td>
                    <td>
                    <input type="text"
                        className =  "input input-bordered w-full input-sm"  
                        placeholder= {t('create-nft.meta-trait-value-placeholder')}
                        {...register(`traits.${index}.value` as const, { required: false})} 
                      />

                    </td>
                  </tr>
          
                ))}

              </tbody>
          </table>
          <div className="grid place-items-end">
            <button type="button" className="btn btn-secondary btn-sm"
              onClick={() => append({ name: "", value: ""})} >
                {t('create-nft.meta-trait-add')}
            </button>
          </div>
        </div>
        
        <Button type="submit" color={"primary"} fullWidth={true} responsive={true} active={true} animation={true} size={"md"}
          loading={submitting} disabled={submitting}>
          {t('create-nft.submit-button')}
        </Button>
        {/* <button type="submit" className="btn btn-primary mt-4 w-full">
          {t('create-nft.submit-button')}
        </button> */}
      </div>
      
    </div>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, query }) => {
// export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const trans = await serverSideTranslations(locale ?? "en", ["common"]);
  console.log("LOCAL", locale);
  return {
      props: {
          countryName: query?.countryName as string ,
          city: query?.city as string ,
          ...trans,
      },
  }
}

// export async function getServerSideProps(context: NextPageContext) {
//   const contractAddress: string | string[] | undefined =
//     context.query.contractAddress;
//   const tokenId: string | string[] | undefined = context.query.tokenId;

//   const data ={};

//   return { props: { data: JSON.stringify(data) } };
// }

export default Create;


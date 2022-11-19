import {FieldValues, useForm, UseFormRegister} from "react-hook-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import React, {useEffect} from "react";
import {useConfirmRedirectIfDirty} from "./useUnsavedChanges";

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

type Props = {
    // Where to GET/POST the form data
    url: string
    // Function that returns a component that will display the inner form
    renderForm: (formProps: FormProps) => React.ReactNode
}

// All values that come from useForm, to be used in our custom forms
export type FormProps = {
    register: UseFormRegister<FieldValues>
    isSubmitting: boolean
    errors: { [error: string]: any }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

async function saveFormData(data: object, url: string) {

    console.log("saveFormData", JSON.stringify(data), url);
    return await fetch(url, {
        body: JSON.stringify(data),
        // headers: {"Content-Type": "application/json"},
        method: "POST"
    })
}

function GenericForm({url, renderForm}: Props) {

    const address = useAddress();
    const { mutateAsync: upload } = useStorageUpload();

    // Fetch our initial form data
    const {data, error} = useSWR("/api/hello", fetcher)
    const {register, reset, handleSubmit, setError, setValue, formState: {isSubmitting, errors, isDirty}} = useForm();

    // Confirm redirects when isDirty is true
    useConfirmRedirectIfDirty(isDirty)

    // console.log("--address", address);
/*         register('authorAddress');
        setValue("authorAddress", address); */

    // Submit handler which displays errors + success messages to the user
    const onSubmit = async (data: object) => {

        console.log("--address", address);

        
        // reset("authorAddress", address);
        reset({
            authorAddress: address,
            // lastName: "luo"
          });
        // register('authorAddress');
        // setValue("authorAddress", address
        // , {
        //     shouldValidate: true,
        //     shouldDirty: true
        //   }
        //   )

        const response = await saveFormData(data, url)

        if (response.status === 400) {
            // Validation error, expect response to be a JSON response {"field": "error message for that field"}
            const fieldToErrorMessage: { [fieldName: string]: string } = await response.json()
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
                setError(fieldName, {type: 'custom', message: errorMessage})
            }
        } else if (response.ok) {
            // successful
            toast.success("Successfully saved")
        } else {
            // unknown error
            toast.error("An unexpected error occurred while saving, please try again")
        }
    }

    // Sets the default value of the form once it's available
    useEffect(() => {
        if (data === undefined) {
            return; // loading
        }
        reset(data);
    }, [reset, data]);

    // Handle errors + loading state
    if (error) {
        return <div>An unexpected error occurred while loading, please try again</div>
    } else if (!data) {
        return <div>Loading...</div>
    }

    // Finally, render the form itself
    return <form onSubmit={handleSubmit(onSubmit)}>
        {renderForm({register, errors, isSubmitting})}
        <ToastContainer position="bottom-center"/>
    </form>;
}

export default GenericForm
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";

const ThirdwebWallet = function ThirdwebWallet() {
    // Helpful thirdweb hooks to connect and manage the wallet from metamask.
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();

    return (
        <>
            <ConnectWallet className="!hover:border-0 !focus:border-0 btn !btn-ghost !border-0 !px-4" 
                // Some customization of the button style
                colorMode="dark"
                // accentColor="#2AFFC0" 
			/>
{/* 
        {address ? ( 
            <a className="btn btn-active btn-ghost" onClick={() => disconnectWallet()}>Disconnect Wallet</a>
        ) : (
            <a className="btn btn-active btn-accent" onClick={() => connectWithMetamask()}>Connect Wallet</a>
        )}
         */}
        </>
    );
}

export default ThirdwebWallet;
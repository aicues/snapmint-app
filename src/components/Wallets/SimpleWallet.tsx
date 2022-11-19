import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";

const SimpleWallet = function SimpleWallet() {
    // Helpful thirdweb hooks to connect and manage the wallet from metamask.
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();

    return (
        <div>
            {address ? ( 
                <a className="btn btn-active btn-ghost" onClick={() => disconnectWallet()}>Disconnect Wallet</a>
            ) : (
                <a className="btn btn-active btn-accent" onClick={() => connectWithMetamask()}>Connect Wallet</a>
            )}
        </div>
    );
}

export default SimpleWallet;
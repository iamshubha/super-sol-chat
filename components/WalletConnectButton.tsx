import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnectButton = () => {
    const { connected, connect, disconnect } = useWallet();

    return (
        <button onClick={() => (connected ? disconnect() : connect())}>
            {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
        </button>
    );
};

export default WalletConnectButton;
// components/AccountInfo.tsx
import { useState } from 'react';

const AccountInfo = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [accountInfo, setAccountInfo] = useState<any>(null);

    const fetchAccountInfo = async () => {
        const response = await fetch(`/api/account?publicKey=${publicKey}`);
        const data = await response.json();
        setAccountInfo(data);
    };

    return (
        <div>
            <input
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter Solana public key"
            />
            <button onClick={fetchAccountInfo}>Fetch Account Info</button>
            {accountInfo && (
                <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
            )}
        </div>
    );
};

export default AccountInfo;

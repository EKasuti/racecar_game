import React, { useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

const WalletConnection = ({ onConnectionChange }) => {
  const [account, setAccount] = useState(null);

  const connectSubstrateWallet = async () => {
    try {
      const extensions = await web3Enable('My Substrate App');
      if (extensions.length === 0) {
        console.log('No extension found');
        return;
      }

      const allAccounts = await web3Accounts();
      if (allAccounts.length > 0) {
        const address = allAccounts[0].address;
        setAccount(address);
        onConnectionChange(true, address);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting Substrate wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onConnectionChange(false, null);
  };

  const joinWithoutWallet = () => {
    onConnectionChange(true, null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connectSubstrateWallet}>Connect Substrate Wallet</button>
          <button onClick={joinWithoutWallet}>Join Without Wallet</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
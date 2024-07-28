import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ onConnectionChange }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        onConnectionChange(true, address);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onConnectionChange(false, null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
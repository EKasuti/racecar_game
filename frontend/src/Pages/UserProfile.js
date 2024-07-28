import React from 'react';
import '../index.css';

function UserProfile({ account, userNFT }) {
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p className="account-info">Connected Account: {account}</p>
      {userNFT ? (
        <div className="nft-display">
          <h2>Your Race Car NFT</h2>
          <div className="nft-content">
            <img src={userNFT.image} alt="Race Car NFT" className="nft-image" />
            <div className="nft-details">
              <p><strong>NFT ID:</strong> {userNFT.id}</p>
              <p><strong>Car Model:</strong> {userNFT.carModel}</p>
              <p><strong>Nickname:</strong> {userNFT.nickname}</p>
              <p><strong>Victories:</strong> {userNFT.victories}</p>
              <p><strong>Defeats:</strong> {userNFT.defeats}</p>
              <p><strong>Collection:</strong> {userNFT.collection}</p>
              <p><strong>Owner:</strong> {userNFT.owner}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="no-nft">Loading your NFT...</p>
      )}
    </div>
  );
}

export default UserProfile;
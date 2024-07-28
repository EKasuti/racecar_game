import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import defaultNftImage from '../images/gold_nft.png';

function UserProfile({ account, userNFT }) {
  const nftDetails = userNFT || {
    collection: 'Daly Dreams',
    collectionId: '3537',
    createdOn: '7/28/2024',
    owner: '5Fdus...UdUy',
    nickname: 'Kasuti',
    victories: 0,
    defeats: 0
  };

  return (
    <div className="user-profile">
      <div className="nft-display">
        <div className="nft-content">
          <div className="nft-image-container">
            <img 
              src={userNFT ? userNFT.image : defaultNftImage} 
              alt={userNFT ? "Race Car NFT" : "Default NFT"} 
              className="nft-image" 
            />
          </div>
          <div className="nft-details">
            <h2 className="nft-title">NFT Created</h2>
            <div className="nft-info-grid">
              <p><strong>Collection:</strong> {nftDetails.collection}</p>
              <p><strong>Collection ID:</strong> {nftDetails.collectionId}</p>
              <p><strong>Created on:</strong> {nftDetails.createdOn}</p>
              <p><strong>Owner:</strong> {nftDetails.owner}</p>
              <p><strong>Nickname:</strong> {nftDetails.nickname}</p>
              <p><strong>Victories:</strong> {nftDetails.victories}</p>
              <p><strong>Defeats:</strong> {nftDetails.defeats}</p>
            </div>
            <div className="play-game-container">
              <Link to="/game" className="play-game-link">Play Game</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
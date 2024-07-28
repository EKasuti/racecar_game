import React, { useState, useEffect } from 'react';
import { getNftData, updateNftData } from '../utils/api';

function Game({ account }) {
  const [nftData, setNftData] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    const fetchNftData = async () => {
      if (account) {
        try {
          setLoading(true);
          const data = await getNftData(account);
          setNftData(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching NFT data:', err);
          setError(`Failed to load NFT data: ${err.message}`);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No account provided');
        setLoading(false);
      }
    };
    fetchNftData();
  }, [account]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
  };

  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const handleGameOver = async () => {
    if (!nftData) return;

    setGameActive(false);

    const updatedData = {
      ...nftData,
      score: nftData.score + score,
      gamesPlayed: nftData.gamesPlayed + 1,
    };

    try {
      await updateNftData(account, updatedData);
      setNftData(updatedData);
    } catch (err) {
      console.error('Error updating NFT data:', err);
      setError('Failed to update game results. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nftData) return <div>No NFT data available</div>;

  return (
    <div className="game-container">
      <h2>Race Car Game</h2>
      <div className="nft-info">
        <p>Total Score: {nftData.score}</p>
        <p>Games Played: {nftData.gamesPlayed}</p>
      </div>
      
      {!gameActive ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div className="active-game">
          <p>Current Score: {score}</p>
          {/* Add your game canvas or components here */}
          <div className="game-controls">
            <button onClick={() => updateScore(10)}>Gain Points</button>
            <button onClick={handleGameOver}>End Game</button>
          </div>
        </div>
      )}
      
      {nftData.nfts && nftData.nfts.length > 0 && (
        <div className="nft-list">
          <h3>Your NFTs:</h3>
          <ul>
            {nftData.nfts.map((nft, index) => (
              <li key={index}>
                NFT ID: {nft.id} - {nft.name || 'Unnamed NFT'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Game;
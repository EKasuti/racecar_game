import React, { useState, useEffect } from 'react';
import RaceTrack from './RaceTrack';

const GamePortal = ({ account }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the account is available and set the login status
    setIsLoggedIn(!!account);
  }, [account]);

  return (
    <div className="game-portal">
      <h1>Welcome to the Race Game</h1>
      {isLoggedIn ? (
        <>
          <p>Instructions:</p>
          <ul>
            <li>Press SPACEBAR to start the race</li>
            <li>Use ARROW KEYS to control your car</li>
            <li>Press Q to end the race</li>
          </ul>
          <RaceTrack account={account} />
        </>
      ) : (
        <p>Please log in with your Substrate account to play the game.</p>
      )}
    </div>
  );
};

export default GamePortal;
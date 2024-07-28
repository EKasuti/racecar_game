import React from 'react';
import RaceTrack from './RaceTrack';

const GamePortal = ({ account }) => {
  return (
    <div className="game-portal">
      <h1>Welcome to the Race Game</h1>
      <p>Instructions:</p>
      <ul>
        <li>Press SPACEBAR to start the race</li>
        <li>Use ARROW KEYS to control your car</li>
        <li>Press Q to end the race</li>
      </ul>
      <RaceTrack account={account} />
    </div>
  );
};

export default GamePortal;
import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaderboard.map((player) => (
          <li key={player.id}>
            {player.nickname}: {player.score}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
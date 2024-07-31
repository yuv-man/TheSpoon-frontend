import React, { useEffect, useState } from 'react';
import { getTodayNotStartedGames } from '../libs/utils'
import CircleImage from '../libs/circleImage';
import './css/Bets.css';

const Bets = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const res = await getTodayNotStartedGames()
      setGames(res)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  const handleBets = async (gameId, team, betValue) => {
    try {
      const response = await fetch(`https://api.example.com/update-bet/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          team,
          betValue
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update bet');
      }

      alert('Bet updated successfully');
    } catch (error) {
      console.error('Error updating bet:', error);
      alert('Failed to update bet');
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bets-container">
      <h1>Pace Your Bets</h1>
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <div className="game-teams">
              <div className='team-item'>
                <strong>{game.home.name}</strong> 
                <CircleImage teamName={game.home.name} />
                <input
                    type="number"
                    min="0"
                    className="bet-input"
                    onChange={(e) => handleBets(game.id, game.home.id, e.target.value)}
                  />
              </div>
              vs 
              <div className='team-item'>
                <input
                    type="number"
                    min="0"
                    className="bet-input"
                    onChange={(e) => handleBets(game.id, game.away.id, e.target.value)}
                  />
                <CircleImage teamName={game.away.name} />
                <strong>{game.away.name}</strong>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bets;

import React, { useEffect, useState, useCallback } from 'react';
import { getGamesFinishedWorldCup,getGamesOngoingWorldCup } from '../libs/utils';
import './css/Results.css'

const Results = () => {
  const [ matchDay, setMatchDay ] = useState(new Date());
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onGoingTab, setOnGoingTab] = useState(false);

  const fetchResults = useCallback(async () => {
    try {
      let data
      if (onGoingTab) {
        data = await getGamesOngoingWorldCup();
      } else {
        data = await getGamesFinishedWorldCup(matchDay);
      }
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching game results:', error);
      setLoading(false);
    }
  }, [onGoingTab, matchDay]);

  useEffect(() => {

    const intervalId = setInterval(fetchResults, 30000);
    fetchResults();

    return () => clearInterval(intervalId); 
  }, [fetchResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDateToDDMMYYYY = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDay = (num) => {
    const newDate = new Date(matchDay.setDate(matchDay.getDate() + num))
    setMatchDay(newDate);
  };

  return (
    <div className="results-container">
      {!onGoingTab ? <h1>Today's Results</h1> : <h1>Ongoing Results</h1>}
      <div>
        <div className="select-match-day">
          <div className="ongoing-buttons">
            <div className={`ongoing ${onGoingTab ? '' : 'picked'}`} 
              onClick={() => setOnGoingTab(false)}>All Results</div>
            <div className={`ongoing ${!onGoingTab ? '' : 'picked'}`} 
              onClick={() => setOnGoingTab(true)}>Ongoing Results</div>
          </div>
          <div>
            <span className='arrow' onClick={() => handleDay(-1)}>&larr;</span>
            <span> { formatDateToDDMMYYYY(matchDay) } </span>
            <span className="arrow" onClick={() => handleDay(1)}>&rarr;</span>
          </div>
        </div>
      </div>
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <div>
              <strong>{game.home.name}</strong> vs <strong>{game.away.name}</strong>
            </div>
            <div>
              Score: {game.home.score} - {game.away.score}
            </div>
            <div className={game.status === 'live' ? 'status-live' : 'status-finished'}>
              Status: {game.status === 'live' ? 'Live' : 'Finished'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;

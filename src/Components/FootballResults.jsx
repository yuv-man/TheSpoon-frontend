// src/FootballResults.js
import React, { useState, useEffect } from 'react';

const FootballResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch('/v2/matches', {
          headers: { 'X-Auth-Token':'17d7ffbf20db497d99736ef6191f1c49' } 
        });
        const data = await response.json();
        setResults(data.matches);
      } catch (error) {
        console.error('Error fetching the football results:', error);
      }
      setLoading(false);
    };

    fetchResults();
    const intervalId = setInterval(fetchResults, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Football Results</h1>
      <ul>
        {results.map(match => (
          <li key={match.id}>
            {match.homeTeam.name} vs {match.awayTeam.name}: {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FootballResults;

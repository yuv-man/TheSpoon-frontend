import React, { useEffect, useState } from 'react';
import './css/Ranking.css';

const Ranking = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRanking = async () => {
    try {
      const response = await fetch('https://api.example.com/ranking');
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.points - a.points);
      setPersons(sortedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ranking:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ranking-container">
      <h1>Ranking</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, index) => (
            <tr key={person.id}>
              <td>{index + 1}</td>
              <td>{person.name}</td>
              <td>{person.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;


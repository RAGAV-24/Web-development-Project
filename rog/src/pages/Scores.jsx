import React, { useEffect, useState } from 'react';
import './Scores.css';
import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const [pastScores, setPastScores] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching scores...'); // Debugging
    const storedScores = JSON.parse(localStorage.getItem('pastScores')) || [];
    setPastScores(storedScores);

    if (storedScores.length > 0) {
      const totalScore = storedScores.reduce((acc, score) => acc + score, 0);
      const average = totalScore / storedScores.length;
      setAverageScore(average.toFixed(2)); // Round to 2 decimal places
      
      const maxScore = Math.max(...storedScores);
      setHighestScore(maxScore);
    } else {
      setAverageScore(0);
      setHighestScore(0);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem('pastScores');
    setPastScores([]);
    setAverageScore(0);
    setHighestScore(0);
    console.log('Local storage cleared.'); // Debugging
  };

  return (
    <div className="scores-container">
      <h1>Past Scores</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {pastScores.length > 0 ? (
            pastScores.map((score, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No scores recorded yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="average-score">
        <h2>Average Score: {averageScore}</h2>
        <h2>Highest Score: {highestScore}</h2>
      </div>
      <button onClick={clearLocalStorage} className="clear-button">
        Clear Local Storage
      </button>
      <button onClick={() => navigate('/game')} className="back-button">
        Back to Game
      </button>
    </div>
  );
};

export default Scores;

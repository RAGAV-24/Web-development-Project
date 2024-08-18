import React, { useState, useEffect } from 'react';
import Dino from './Dino';
import Obstacle from './Obstacle';
import './Game.css';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstaclePositions, setObstaclePositions] = useState([1000]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isGameOver) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setObstaclePositions((prevPositions) => {
        return prevPositions.map((pos) => {
          const newPos = pos - 10;
          if (newPos <= 0) {
            setScore((prev) => prev + 1);
            return 1000 + Math.random() * 500;
          }
          return newPos;
        });
      });

      if (obstaclePositions.length < 3 && Math.random() < 0.02) {
        setObstaclePositions((prevPositions) => [...prevPositions, 1000 + Math.random() * 500]);
      }

      const dino = document.querySelector('.dino');
      const obstacles = document.querySelectorAll('.obstacle');

      obstacles.forEach((obstacle) => {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          dinoRect.left < obstacleRect.right &&
          dinoRect.right > obstacleRect.left &&
          dinoRect.bottom > obstacleRect.top &&
          dinoRect.top < obstacleRect.bottom
        ) {
          setIsGameOver(true);

          const pastScores = JSON.parse(localStorage.getItem('pastScores')) || [];
          if (score > 0) {
            pastScores.push(score);
            localStorage.setItem('pastScores', JSON.stringify(pastScores));
          }

          // Update highest score
          const maxScore = Math.max(...pastScores, score);
          setHighestScore(maxScore);
          localStorage.setItem('highestScore', maxScore); // Store in local storage
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isGameOver, score, obstaclePositions]);

  const restartGame = () => {
    setIsJumping(false);
    setObstaclePositions([1000]);
    setScore(0);
    setIsGameOver(false);
  };

  const viewScores = () => {
    navigate('/scores');
  };

  useEffect(() => {
    // Fetch highest score from local storage on component mount
    const storedHighestScore = localStorage.getItem('highestScore') || 0;
    setHighestScore(Number(storedHighestScore));
  }, []);

  useEffect(() => {
    if (isGameOver) {
      console.log('Game Over! Final Score:', score);
    }
  }, [isGameOver, score]);

  return (
    <div className="game-container">
      <div className="game">
        <Dino isJumping={isJumping} />
        {obstaclePositions.map((position, index) => (
          <Obstacle key={index} position={position} />
        ))}
        <div className="score">Score: {score}</div>
        <div className="highest-score">Highest Score: {highestScore}</div> {/* Display highest score */}
        {isGameOver && (
          <div className="game-over">
            <p>Game Over! Final Score: {score}</p>
            <button onClick={restartGame} className="restart-button">
              Restart Game
            </button><br></br>
            <br></br>
            <button onClick={viewScores} className="view-scores-button">
              View Past Scores
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;

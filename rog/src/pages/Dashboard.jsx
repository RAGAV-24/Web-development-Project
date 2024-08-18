import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);

    // Simulate a delay to show the loading effect for 2 seconds
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Navigate to the Game component after loading
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="dashboard-container">
      {!loading ? (
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
      ) : (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

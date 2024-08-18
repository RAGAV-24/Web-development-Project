import React from 'react';
import './Obstacle.css';

const Obstacle = ({ position }) => {
  return (
    <div className="obstacle" style={{ left: position }} />
  );
};

export default Obstacle;

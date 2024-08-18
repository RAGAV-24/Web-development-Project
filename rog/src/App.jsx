import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import Game from './pages/Game'; 
import Scores from './pages/Scores'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        
        <Route path="/game" element={<Game />} />
        <Route path="/scores" element={<Scores />} />
        </Routes>
    </Router>
  );
};

export default App;

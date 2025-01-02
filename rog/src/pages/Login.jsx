import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const authenticateUser = async (email, password) => {
  try {
    const response = await fetch('https://web-development-project-abzq.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is valid JSON
    let data;
    try {
      data = await response.json();
    } catch (err) {
      throw new Error('Server is not responding properly. Please try again later.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('Email and Password are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await authenticateUser(email, password);
      console.log('Authenticated successfully!', response);
      window.alert('Authenticated successfully!');

      // Redirect to another component after successful login
      navigate('/dashboard'); // Update with the path to your target component
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:<br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:<br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;

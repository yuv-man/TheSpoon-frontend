import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext'

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !password) {
      setError('Both name and password are required');
      return;
    }

    try {
      // Send login data to the API endpoint
      const response = await logIn(name, password);
      
      if (response.user) {
        caches[name] = response.user.id
        setSuccess('Login successful');
        setError('');
        setName('');
        setPassword('');
        navigate('/bets');
      } else {
        const errorData = response.error
        setError(errorData.message || 'Failed to log in');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


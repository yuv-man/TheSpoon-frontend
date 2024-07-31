import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await signUp(userName, password);
    if (res.user) {
      caches[userName] = res.user.id
      setSuccess('Sign up successful');
      setError('');
      setUserName('');
      setPassword('');
      navigate('/');
    } else {
      setError(res.error || 'Failed to register');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSignUp}>
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn(username, password)) {
      history.push('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

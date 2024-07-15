import React from 'react';
import { useAuth } from '../Contexts/AuthContext';

const LogIn = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>Log In</h1>
      <button onClick={signOut}>Log Out</button>
    </div>
  );
};

export default LogIn;

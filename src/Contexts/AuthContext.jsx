import React, { createContext, useState, useContext, useEffect } from 'react';
import { signUpApi, logInApi } from '../libs/authUtils'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const signUp = async (username, password) => {
    return signUpApi(username, password);
  }

  const logIn = async (username, password) => {
    return logInApi(username, password);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

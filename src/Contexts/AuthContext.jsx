import React, { createContext, useState, useContext, useEffect } from 'react';

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

  const signIn = async (username, password) => {
    // Replace with your actual sign-in logic
    if (username === 'test' && password === 'password') {
      const user = { id: 1, username: 'test' }; // Example user object
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return null;
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

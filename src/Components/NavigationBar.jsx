import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import "./css/NavigationBar.css"
import spoon from './assets/images/spoon-svgrepo-com.svg'; // Adjust the path as needed

const NavigationBar = () => {
    const { user, signOut } = useAuth();

  return (
    <div className="nav-container">
      <div className="main-navbar">
        <div className="navbar-brand">
          <Link id="main-link" to="/">
            <span id="spoon-icon">The Spoon</span>
            <img
              alt="logo"
              src={spoon}
              width="47"
              height="47"
              className="d-inline-block align-top"
            />
          </Link>
        </div>
        <div className="navbar-collapse">
          {user && (
            <div className="nav-links">
              <Link to="/profile" id="links">My Profile</Link>
              <Link to="/results" id="links">Results</Link>
              <Link to="/bets" id="links">My Bets</Link>
              <Link to="/ranking" id="links">Ranking</Link>
              <Link to="/rules" id="links">Rules</Link>
            </div>
          )}
        </div>
        <div className="auth-links">
          {!user ? (
            <div>
              <Link to="/signup" className="links">Sign Up</Link>
              <Link to="/login" className="links">Log In</Link>
            </div>
          ) : (
            <Link to="/results" className="links" onClick={signOut}>Sign Out</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

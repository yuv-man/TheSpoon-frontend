// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Profile from './Components/Profile';
import Ranking from './Components/Ranking';
import Bets from './Components/Bets';
import SignIn from './Components/SignIn';
import LogIn from './Components/LogIn';
import PrivateRoute from './Components/PrivateRoute';
import FootballResults from './Components/FootballResults';
import { AuthProvider } from './Contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/ranking">Ranking</Link>
              </li>
              <li>
                <Link to="/results">Results</Link>
              </li>
              <li>
                <Link to="/bets">Bets</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/ranking" component={Ranking} />
            <PrivateRoute path="/results" component={FootballResults} />
            <PrivateRoute path="/bets" component={Bets} />
            <Route path="/signin" component={SignIn} />
            <Route path="/login" component={LogIn} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

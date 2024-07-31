import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Profile from './Components/Profile';
import Ranking from './Components/Ranking';
import Bets from './Components/Bets';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import PrivateRoute from './Components/Routes/PrivateRoute';
import FootballResults from './Components/FootballResults';
import { AuthProvider } from './Contexts/AuthContext';
import NavigationBar from './Components/NavigationBar';
import Rules from './Components/Rules';
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Navigate to="/bets" />} /> 

            <Route
              path="/results"
              element={<PrivateRoute component={FootballResults} />}
            />
          <Route
              path="/profile"
              element={<PrivateRoute component={Profile} />}
            />
            <Route
              path="/ranking"
              element={<PrivateRoute component={Ranking} />}
            />
            <Route path="/bets" element={<PrivateRoute component={Bets} />} />
            <Route path="/rules" element={<PrivateRoute component={Rules} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

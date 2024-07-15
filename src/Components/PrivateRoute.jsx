import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    />
  );
};

export default PrivateRoute;

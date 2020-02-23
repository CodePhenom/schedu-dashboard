import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return user ? <Component /> : <Redirect to='/login' />;
      }}
    />
  );
};

export default PrivateRoute;

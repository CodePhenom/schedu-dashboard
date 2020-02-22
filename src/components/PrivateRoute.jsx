import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(user);
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

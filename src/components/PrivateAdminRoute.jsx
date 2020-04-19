import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const idTokenResult = JSON.parse(localStorage.getItem('idTokenResult'));
  const isAdmin = idTokenResult && idTokenResult.claims.isAdmin;

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAdmin ? <Component {...props} /> : <Redirect to='/' />;
      }}
    />
  );
};

export default PrivateAdminRoute;

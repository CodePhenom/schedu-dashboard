import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

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

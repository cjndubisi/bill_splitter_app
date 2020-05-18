import React, { useContext } from 'react';
import { Route, Redirect } from '.';
import { AuthContext } from '../context/AuthContext';

export default ({ component: Component, ...rest }) => {
  const {
    state: { isSignedIn },
  } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

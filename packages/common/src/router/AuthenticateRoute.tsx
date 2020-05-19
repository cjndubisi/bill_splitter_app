import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from '.';
import { AuthContext } from '../context/AuthContext';


/*
  Redirect app if user is authenticated.
*/

export default ({ component: Component, ...rest }) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const login = async () => {
      await tryToLogin();
    };
    login();
    setLoading(isLoading);
  }, []);

  if (loading) {
    return null;
  }

  if (!isSignedIn && !loading) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/home" />;
};

import React, { useContext, useLayoutEffect, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default ({ navigation }) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;

  const firstTime = useRef(false);
  useLayoutEffect(() => {
    const login = async () => {
      await tryToLogin();
      firstTime.current == false;
    };
    login();
  }, []);

  useEffect(() => {
    if (!firstTime.current && !isSignedIn) {
      navigation.navigate('Splash');
    }
  }, [firstTime.current]);

  if (isSignedIn) {
    navigation.navigate('Home');
  }

  return null;
};

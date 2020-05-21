import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default ({ navigation }) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;

  useEffect(() => {
    const login = async () => {
      await tryToLogin();
    };
    login();
    if (!isSignedIn) {
      navigation.navigate('Splash');
    }
  }, []);

  if (isSignedIn) {
    navigation.navigate('Home');
  }

  return null;
};

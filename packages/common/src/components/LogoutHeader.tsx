import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const {
    logout,
    state: { isSignedIn },
  } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (!isSignedIn) {
      navigation.navigate('Splash');
    }
  }, [isSignedIn]);

  return (
    <Icon
      name="sign-out"
      iconStyle={{ marginRight: 20, color: 'white' }}
      type="font-awesome"
      onPress={logout}
    />
  );
};

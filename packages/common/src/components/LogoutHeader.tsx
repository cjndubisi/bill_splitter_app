import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import { Button, Header } from 'react-native-elements';
import RefreshMenu from './RefreshGroupMenu';
import { useNavigation } from '@react-navigation/native';

export default ({ title }) => {
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
    <Header
      statusBarProps={{ hidden: true, translucent: true }}
      leftComponent={<RefreshMenu />}
      centerComponent={{
        text: title,
        style: { color: '#fff', fontWeight: 'bold' },
      }}
      rightComponent={<Button onPress={logout} title={'Logout'} />}
    />
  );
};

import React, { useContext } from 'react';
import { AuthContext } from '../context';
import { Button, Header } from 'react-native-elements';
import RefreshMenu from './RefreshGroupMenu';

export default ({ title }) => {
  const { logout } = useContext(AuthContext);
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

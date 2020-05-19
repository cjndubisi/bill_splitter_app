import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Button onPress={logout} title={'Logout'} />
    </View>
  );
};
export default Home;

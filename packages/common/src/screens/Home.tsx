import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import { Container } from '../styled';
const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <Button onPress={logout} title={'Logout'} />
    </Container>
  );
};
export default Home;

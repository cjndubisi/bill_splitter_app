import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import { Container } from '../styled';
const Home = () => {
  const { logout } = useContext(AuthContext);

  const addGroup = () => {};

  return (
    <Container>
      <Header
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={() => <Button onPress={logout} title={'Logout'} />}
      />

      <Button onPress={addGroup} title={'Start a group'} />
    </Container>
  );
};
export default Home;

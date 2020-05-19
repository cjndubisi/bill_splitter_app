import React from 'react';
import { View, Text } from 'react-native';
import { Link } from '../router';
import { Container } from '../styled';

const Splash = ({ match }) => {
  return (
    <Container>
      <View>
        <Text>BillSplit</Text>
      </View>
      <Link to={`/signup`}>
        <Text>Sign Up</Text>
      </Link>
      <Link to={`/login`}>
        <Text>Login</Text>
      </Link>
    </Container>
  );
};

export default Splash;

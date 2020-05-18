import React from 'react';
import { View, Text } from 'react-native';
import { Link } from './router';

const Splash = ({ match }) => {
  return (
    <View>
      <View>
        <Text>BillSplit</Text>
      </View>
      <Link to={`/signup`}>
        <Text>Sign Up</Text>
      </Link>
      <Link to={`/login`}>
        <Text>Login</Text>
      </Link>
    </View>
  );
};

export default Splash;

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Link } from '../router';
import { Container } from '../styled';

const Splash = ({ navigation }) => {
  return (
    <Container>
      <View>
        <Text>BillSplit</Text>
      </View>
      <Button title={'Sign Up'} onPress={() => navigation.navigate('SignUp')} />
      <Button title={'Login'} onPress={() => navigation.navigate('Login')} />
    </Container>
  );
};

export default Splash;

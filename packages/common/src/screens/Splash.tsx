import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Link } from '../router';
import { Container } from '../styled';

const Splash = ({ navigation }) => {
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>BillSplit</Text>
      </View>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Button
          title={'Sign Up'}
          style={{ width: 200, marginVertical: 10 }}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          title={'Login'}
          style={{ width: 200, marginVertical: 10 }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Container>
  );
};

export default Splash;

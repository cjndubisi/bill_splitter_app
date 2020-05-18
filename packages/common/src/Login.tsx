import React, { useState } from 'react';
import { View } from 'react-native';
import Button from './components/Button';
import { Input } from './styled';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Input onChangeText={setEmail} placeholder="Email" value={email} />
      <Input
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
      />
      <Button title={'Login'} />
    </View>
  );
};

export default Login;

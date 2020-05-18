import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import Button from './components/Button';
import { Input } from './styled';
import { AuthContext } from './context/AuthContext';
import Config from './utils/config';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    state: { isLoading, isSignedIn },
    signUpWithEmail,
  } = useContext(AuthContext);
  if (isSignedIn) {
  }
  const signUp = async () => {
    await signUpWithEmail({ name, email, password });
  };
  return (
    <View>
      <Input
        onChangeText={setName}
        placeholder="Name"
        secureTextEntry={true}
        value={name}
      />
      <Input onChangeText={setEmail} placeholder="Email" value={email} />
      <Input
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
      />
      <Button onPress={signUp} title={'Sign up'} />
    </View>
  );
};
export default SignUp;

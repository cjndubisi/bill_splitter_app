import React, { useState, useContext } from 'react';
import { View, Platform } from 'react-native';
import Button from './components/Button';
import { Input } from './styled';
import { AuthContext } from './context/AuthContext';
import ActivityLoader from './components/ActivityLoader';
import { Redirect } from './router';

const isWeb = Platform.OS === 'web';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    state: { isLoading, isSignedIn },
    signUpWithEmail,
  } = useContext(AuthContext);

  if (isSignedIn) {
    return <Redirect to="/home" />;
  }
  const signUp = async () => {
    await signUpWithEmail({ name, email, password });
  };
  return (
    <View>
      <ActivityLoader animating={isLoading && !isWeb} />

      <Input onChangeText={setName} placeholder="Name" value={name} />
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

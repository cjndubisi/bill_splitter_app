import React, { useState, useContext, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import Button from './components/Button';
import { Input, ErrorView } from './styled';
import { AuthContext } from './context/AuthContext';
import ActivityLoader from './components/ActivityLoader';
import { Redirect } from './router';

const isWeb = Platform.OS === 'web';
const SignUp = () => {
  const {
    state: { isLoading, isSignedIn, error },
    signUpWithEmail,
  } = useContext(AuthContext);
  const [viewError, setError] = useState(error);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setError(error);
  }, [error]);
  if (isSignedIn) {
    return <Redirect to="/home" />;
  }
  const signUp = async () => {
    await signUpWithEmail({ name, email, password });
  };
  return (
    <View>
      <ActivityLoader animating={isLoading && !isWeb} />
      {viewError && <ErrorView title={viewError} />}

      <Input
        onFocus={() => setError(null)}
        onChangeText={setName}
        placeholder="Name"
        value={name}
      />
      <Input
        onFocus={() => setError(null)}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <Input
        onFocus={() => setError(null)}
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

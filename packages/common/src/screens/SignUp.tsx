import React, { useState, useContext, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ErrorView, Container } from '../styled';
import { AuthContext } from '../context/AuthContext';
import ActivityLoader from '../components/ActivityLoader';

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

  const signUp = async () => {
    await signUpWithEmail({ name, email, password });
  };
  return (
    <Container style={{ paddingHorizontal: 20 }}>
      <ActivityLoader animating={isLoading && !isWeb} />
      <View style={{ marginVertical: 20 }}>
        {viewError && <ErrorView title={viewError} />}
        <Input
          onFocus={() => setError(null)}
          style={{ paddingHorizontal: 30 }}
          onChangeText={setName}
          placeholder="Name"
          value={name}
        />
        <Input
          onFocus={() => setError(null)}
          style={{ paddingHorizontal: 30 }}
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
      </View>
      <Button onPress={signUp} title={'Sign up'} />
    </Container>
  );
};
export default SignUp;

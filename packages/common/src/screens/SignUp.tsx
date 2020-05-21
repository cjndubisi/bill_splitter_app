import React, { useState, useContext, useEffect } from 'react';
import { View, Platform, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ErrorView, Container } from '../styled';
import { AuthContext } from '../context/AuthContext';
import ActivityLoader from '../components/ActivityLoader';
import validatejs from 'validate.js';

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

  const [formError, setFormError] = useState(null);

  var constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    email: {
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters',
      },
    },
  };
  useEffect(() => {
    setError(error);
  }, [error]);

  const signUp = async () => {
    const validation = validatejs({ name, email, password }, constraints);
    if (Object.keys(validation).length > 0) {
      setFormError(validation);
      return;
    }
    await signUpWithEmail({ name, email, password });
  };
  return (
    <Container style={{ paddingHorizontal: 20 }}>
      <ActivityLoader animating={isLoading && !isWeb} />
      <View style={{ marginVertical: 20 }}>
        {viewError && <ErrorView title={viewError} />}
        <Input
          onFocus={() => {
            setError(null);
            setFormError(null);
          }}
          style={{ paddingHorizontal: 30 }}
          onChangeText={setName}
          placeholder="Name"
          value={name}
          errorMessage={formError?.['name']?.[0] || ''}
        />
        <Input
          onFocus={() => {
            setError(null);
            setFormError(null);
          }}
          style={{ paddingHorizontal: 30 }}
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          errorMessage={formError?.['email']?.[0] || ''}
        />
        <Input
          onFocus={() => {
            setError(null);
            setFormError(null);
          }}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          errorMessage={formError?.['password']?.[0] || ''}
        />
      </View>
      <Button onPress={signUp} title={'Sign up'} />
    </Container>
  );
};
export default SignUp;

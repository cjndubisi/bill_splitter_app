import React, { useState, useContext, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { ErrorView, Container } from '../styled';
import { AuthContext } from '../context/AuthContext';
import ActivityLoader from '../components/ActivityLoader';
import { Button, Input } from 'react-native-elements';
const isWeb = Platform.OS === 'web';

const Login = ({ navigation }) => {
  const {
    state: { isLoading, isSignedIn, error },
    loginWithEmail,
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewError, setError] = useState(error);

  useEffect(() => {
    setError(error);
  }, [error]);

  const login = async () => {
    await loginWithEmail({ email, password });
  };
  return (
    <Container style={{ paddingHorizontal: 20 }}>
      <ActivityLoader animating={isLoading && !isWeb} />
      <View style={{ marginVertical: 20 }}>
        {viewError && <ErrorView title={viewError} />}
        <Input
          style={{ paddingHorizontal: 30 }}
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
        />
        <Input
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
        />
      </View>
      <Button onPress={login} title={'Login'} />
    </Container>
  );
};

export default Login;

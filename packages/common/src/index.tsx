import React from 'react';
import { View } from 'react-native';
import { Router } from './router';
import Splash from './screens/Splash';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AllProviders from './context/AllProviders';
import Home from './screens/Home';
import PrivateRoute from './router/PrivateRoute';
import AuthenticateRoute from './router/AuthenticateRoute';

const App = () => {
  return (
    <AllProviders>
      <Router>
        <View>
          <AuthenticateRoute exact path="/" component={Splash} />
          <PrivateRoute exact path="/home" component={Home} />
          <AuthenticateRoute exact path="/login" component={Login} />
          <AuthenticateRoute exact path="/signup" component={SignUp} />
        </View>
      </Router>
    </AllProviders>
  );
};

export default App;

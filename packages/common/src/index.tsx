import React from 'react';
import { View } from 'react-native';
import { Route, Router } from './router';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';
import { AuthProvider } from './context/AuthContext';
import Home from './Home';
import PrivateRoute from './router/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <View>
          <Route exact path="/" component={Splash} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </View>
      </Router>
    </AuthProvider>
  );
};

export default App;

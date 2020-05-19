import React from 'react';
import { View } from 'react-native';
import { Route, Router } from './router';
import Splash from './screens/Splash';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { AuthProvider } from './context/AuthContext';
import Home from './screens/Home';
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

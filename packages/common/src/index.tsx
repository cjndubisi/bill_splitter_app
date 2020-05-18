import React from 'react';
import { View } from 'react-native';
import { Route, Router } from './router';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';

const App = () => {
  return (
    <Router>
      <View>
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </View>
    </Router>
  );
};

export default App;

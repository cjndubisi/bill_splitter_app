import React, { useContext } from 'react';
import { Navigation } from 'react-router-navigation';
import { Router } from './router';
import Splash from './screens/Splash';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AllProviders from './context/AllProviders';
import Home from './screens/Home';
import PrivateRoute from './router/PrivateRoute';
import AuthenticateRoute from './router/AuthenticateRoute';
import { Container } from './styled';
import { Button, Header } from 'react-native-elements';
import { AuthContext } from './context';

const App = () => {
  const NavHeader = () => {
    const { logout } = useContext(AuthContext);
    return (
      <Header
        statusBarProps={{ hidden: true, translucent: true }}
        centerComponent={{
          text: 'BillSplit',
          style: { color: '#fff', fontWeight: 'bold' },
        }}
        rightComponent={<Button onPress={logout} title={'Logout'} />}
      />
    );
  };

  return (
    <AllProviders>
      <Container>
        <Router>
          <Navigation navBarStyle={{ backgroundColor: '#e0ffffbb' }}>
            <AuthenticateRoute exact path="/" component={Splash} />
            <PrivateRoute
              renderNavBar={() => <NavHeader />}
              exact
              path="/home"
              component={Home}
            />
            <AuthenticateRoute exact path="/login" component={Login} />
            <AuthenticateRoute exact path="/signup" component={SignUp} />
          </Navigation>
        </Router>
      </Container>
    </AllProviders>
  );
};

export default App;

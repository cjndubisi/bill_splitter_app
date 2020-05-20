import React, { useContext } from 'react';
import { Navigation } from 'react-router-navigation';
import { Router, Switch } from './router';
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
import Group from './screens/Group';

const App = () => {
  const NavHeader = ({ title }) => {
    const { logout } = useContext(AuthContext);
    return (
      <Header
        statusBarProps={{ hidden: true, translucent: true }}
        centerComponent={{
          text: title,
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
              renderNavBar={() => <NavHeader title={'BillSplit'} />}
              // exact
              path="/home"
              component={Home}
            />
            <AuthenticateRoute exact path="/login" component={Login} />
            <AuthenticateRoute exact path="/signup" component={SignUp} />
            <PrivateRoute
              renderNavBar={() => <NavHeader title={'BillSplit'} />}
              path="/groups/:id"
              component={Group}
            />
          </Navigation>
        </Router>
      </Container>
    </AllProviders>
  );
};

export default App;

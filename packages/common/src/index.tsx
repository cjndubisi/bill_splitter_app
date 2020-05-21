import React, { useContext } from 'react';
import Splash from './screens/Splash';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AllProviders from './context/AllProviders';
import Home from './screens/Home';
import { Container } from './styled';
import { Button, Header, Icon } from 'react-native-elements';
import { AuthContext } from './context';
import Group from './screens/Group';
import Balance from './screens/Balance';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthResolver from './screens/AuthResolver';

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
const SCREENS = {
  AuthResolver: {
    path: 'authenticating',
    component: AuthResolver,
    options: { headerShown: false },
  },
  Splash: {
    path: '/',
    component: Splash,
    options: { headerShown: false },
  },
  Login: {
    path: 'login',
    component: Login,
  },
  Home: {
    path: 'home',
    component: Home,
    options: {
      header: () => {
        return <NavHeader title={'BillSplit'} />;
      },
    },
  },
  SignUp: {
    path: 'signup',
    component: SignUp,
  },
  Group: {
    path: 'groups/:id',
    component: Group,
    options: {
      headerTransparent: true,
      title: '',
      headerRight: () => (
        <Icon
          name="cog"
          iconStyle={{ marginRight: 20 }}
          type="font-awesome"
          onPress={() => console.log('hello')}
        />
      ),
    },
  },
  Balance: {
    path: 'groups/:id/balances',
    component: Balance,
  },
};

type RootStackParamList = any;
const App = () => {
  const linking = {
    prefixes: ['/'],
    config: Object.keys(SCREENS).reduce(
      (acc, next) => ({
        ...acc,
        ...{
          [next]: {
            path: SCREENS[next].path,
            screens: SCREENS[next].screens,
          },
        },
      }),
      {}
    ),
  };

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Container>
      <AllProviders>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            {Object.keys(SCREENS).map((Screen) => (
              <Stack.Screen
                key={SCREENS[Screen].name}
                name={Screen}
                options={SCREENS[Screen].options || {}}
                component={SCREENS[Screen].component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </AllProviders>
    </Container>
  );
};

export default App;

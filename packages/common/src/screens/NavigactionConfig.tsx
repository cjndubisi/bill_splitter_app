import React, { useContext } from 'react';
import { useRoute, useLinkTo } from '@react-navigation/native';
import { Button, Header, Icon } from 'react-native-elements';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import { AuthContext } from '../context';
import Group from './Group';
import Balance from './Balance';
import AuthResolver from './AuthResolver';
import GroupSetting from './GroupSetting';

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

const Settings = () => {
  const linkTo = useLinkTo();
  const { params } = useRoute();

  return (
    <Icon
      name="cog"
      iconStyle={{ marginRight: 20 }}
      type="font-awesome"
      onPress={() => linkTo(`/groups/${params.id}/settings`)}
    />
  );
};
export default {
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
      cardStyle: {
        backgroundColor: '#e0ffffbb',
      },
      headerStyle: {},
      headerRight: () => <Settings />,
    },
  },
  GroupSetting: {
    path: 'groups/:id/settings',
    options: {
      headerTransparent: true,
      title: 'Settings',
    },
    component: GroupSetting,
  },
  Balance: {
    path: 'groups/:id/balances',
    component: Balance,
  },
};

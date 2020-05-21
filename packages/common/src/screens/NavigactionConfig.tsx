import React from 'react';
import LogoutHeader from '../components/LogoutHeader';
import GroupSettingMenu from '../components/GroupSettingMenu';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Group from './Group';
import Balance from './Balance';
import AuthResolver from './AuthResolver';
import GroupSetting from './GroupSetting';

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
    options: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#157dd3',
      },
    },
  },
  Home: {
    path: 'home',
    component: Home,
    options: {
      header: () => <LogoutHeader title={'BillSplit'} />,
    },
  },
  SignUp: {
    path: 'signup',
    component: SignUp,
    options: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#157dd3',
      },
    },
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
      headerRight: () => <GroupSettingMenu />,
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

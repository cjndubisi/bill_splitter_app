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
import RefreshGroupMenu from '../components/RefreshGroupMenu';

const defaultOptions = {
  headerTintColor: 'white',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#157dd3',
  },
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
    options: {
      ...defaultOptions,
    },
  },
  Home: {
    path: 'home',
    component: Home,
    options: {
      ...defaultOptions,
      headerLeft: () => <RefreshGroupMenu />,
      headerRight: () => <LogoutHeader />,
    },
  },
  SignUp: {
    path: 'signup',
    component: SignUp,
    options: {
      ...defaultOptions,
    },
  },
  Group: {
    path: 'groups/:id',
    component: Group,
    options: {
      ...defaultOptions,
      title: '',
      headerRight: () => <GroupSettingMenu />,
    },
  },
  GroupSetting: {
    path: 'groups/:id/settings',
    options: {
      ...defaultOptions,
      title: 'Settings',
    },
    component: GroupSetting,
  },
  Balance: {
    path: 'groups/:id/balances',
    options: {
      ...defaultOptions,
    },
    component: Balance,
  },
};

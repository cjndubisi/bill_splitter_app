import React from 'react';
import { Dispatch, Reducer, ReducerAction } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { register, login } from '../api';
import { User } from '../api/types';
import createDataContext from './createDataProvider';
const AUTH_USER_TOKEN_KEY = 'AUTH_USER_TOKEN_KEY';

interface State {
  user: User;
  isLoading: boolean;
  auth_token: string;
  error: any;
  isSignedIn: boolean;
}

type Action = {
  type: AuthTypes;
  payload?: any;
};

enum AuthTypes {
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  LOADING = 'LOADING',
}

type AuthReducer = Reducer<State, Action>;

const authReducer: AuthReducer = (prevState, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS:
      return {
        ...prevState,
        ...(action.payload || {}),
        user: action.payload?.user,
        user_token: action.payload?.user_token,
        isLoading: false,
        error: undefined,
      };
    case AuthTypes.LOADING:
      return {
        ...prevState,
        isLoading: true,
        error: undefined,
      };
    case AuthTypes.AUTH_FAILURE:
      return {
        ...prevState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return prevState;
  }
};

const authActions = (dispatch: Dispatch<ReducerAction<AuthReducer>>) => ({
  logout: async () => {
    dispatch({ type: AuthTypes.LOADING });
    await AsyncStorage.clear();
    dispatch({
      type: AuthTypes.AUTH_SUCCESS,
      payload: {
        user: null,
        user_token: null,
        isSignedIn: false,
      },
    });
  },
  tryToLogin: async () => {
    dispatch({ type: AuthTypes.LOADING });
    const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);
    if (auth_token) {
      return dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload: {
          user_token: auth_token,
          isSignedIn: true,
        },
      });
    }
    dispatch({
      type: AuthTypes.AUTH_FAILURE,
    });
  },
  loginWithEmail: async (info: { email: string; password: string }) => {
    dispatch({ type: AuthTypes.LOADING });

    try {
      const { user, token: auth_token } = await login(info);

      await AsyncStorage.setItem(AUTH_USER_TOKEN_KEY, auth_token);

      dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload: {
          user,
          user_token: auth_token,
          isSignedIn: true,
        },
      });
    } catch (error) {
      dispatch({
        type: AuthTypes.AUTH_FAILURE,
        payload: error.message || error,
      });
    }
  },
  signUpWithEmail: async (info: Partial<User & { password: string }>) => {
    dispatch({ type: AuthTypes.LOADING });

    const request = info;
    try {
      const { user, token: auth_token } = await register(request);

      await AsyncStorage.setItem(AUTH_USER_TOKEN_KEY, auth_token);

      dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload: {
          user,
          user_token: auth_token,
        },
      });
    } catch (error) {
      dispatch({
        type: AuthTypes.AUTH_FAILURE,
        payload: error.message || error,
      });
    }
  },
});

type DispatchAction = typeof authActions;

const INITIAL_STATE = {
  user: undefined,
  auth_token: undefined,
  isLoading: false,
  error: null,
  isSignedIn: false,
};

const { Provider, Context } = createDataContext<
  AuthReducer,
  DispatchAction,
  State
>(authReducer, authActions, INITIAL_STATE);

export { Provider as AuthProvider, Context as AuthContext };

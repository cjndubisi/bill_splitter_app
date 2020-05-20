import AsyncStorage from '@react-native-community/async-storage';
import Config from './../utils/config';
import { handleRequestPost, handleRequestGet } from './common';
import { User } from './types';
const { API_URL } = Config;
const AUTH_USER_TOKEN_KEY = 'AUTH_USER_TOKEN_KEY';

export const createGroup = async (name: string) => {
  const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);

  return handleRequestPost(
    `${API_URL}${'/groups'}`,
    { name },
    { Authorization: `bearer ${auth_token}` }
  );
};

export const allGroups = async (name: string) => {
  const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);

  return handleRequestGet(`${API_URL}${'/groups'}`, {
    Authorization: `bearer ${auth_token}`,
  });
};

export const addFriendToGroup = async (
  group: number,
  friend: Partial<User>
) => {
  const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);

  return handleRequestPost(`${API_URL}/groups/${group}/users`, friend, {
    Authorization: `bearer ${auth_token}`,
  });
};

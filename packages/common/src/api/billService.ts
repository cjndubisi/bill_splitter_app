import AsyncStorage from '@react-native-community/async-storage';
import { Config, AUTH_USER_TOKEN_KEY } from './../utils';
import { handleRequestPost } from './common';
import { Bill } from './types';
const { API_URL } = Config;

export const addBillToGroup = async (bill: Bill) => {
  const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);
  console.log(bill);

  return handleRequestPost(`${API_URL}/bills`, bill, {
    Authorization: `bearer ${auth_token}`,
  });
};

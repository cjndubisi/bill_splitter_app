import { RegisterResponse, User } from './types';
import Config from './../utils/config';
import { handleRequestPost } from './common';
const { API_URL } = Config;

export const register = async (
  user: Partial<User>
): Promise<RegisterResponse> =>
  handleRequestPost(`${API_URL}${'/users/signup'}`, user);

export const login = async (user: { email: string; password: string }) =>
  handleRequestPost(`${API_URL}${'/users/login'}`, user);

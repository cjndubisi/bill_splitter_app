import { RegisterResponse, User } from './types';
import Config from './../utils/config';

const { API_URL } = Config;

const handleRequestPost = async (url: string, payload: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};

export const register = async (
  user: Partial<User>
): Promise<RegisterResponse> =>
  handleRequestPost(`${API_URL}${'/users/signup'}`, user);

export const login = async (user: { email: string; password: string }) =>
  handleRequestPost(`${API_URL}${'/users/login'}`, user);

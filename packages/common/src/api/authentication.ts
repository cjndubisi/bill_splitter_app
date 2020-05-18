import { RegisterResponse, User } from './types';
import Config from './../utils/config';

const { API_URL } = Config;

export const register = async (
  user: Partial<User>
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}${'/users'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const json = await response.json();
  if (!response.ok) {
    const errors = json.errors;
    throw new Error(JSON.stringify(errors));
  }
  return json;
};

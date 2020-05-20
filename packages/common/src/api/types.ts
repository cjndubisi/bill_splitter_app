export type User = {
  id: number;
  name: string;
  email: string;
};

export type RegisterResponse = {
  user: User;
  message: string;
  token: string;
};

export type Group = {
  id: number;
  name: string;
  users: User[];
};

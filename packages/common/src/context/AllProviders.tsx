import React from 'react';
import { AuthProvider } from './AuthContext';
import { ApiProvider } from './ApiContext';

export default ({ children }) => (
  <AuthProvider>
    <ApiProvider>{children}</ApiProvider>
  </AuthProvider>
);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Api } from '../../services/api';
import { IAuth, IAuthContext, IAuthProvider, IUser } from './types';
import { getLocalStorage, LoginRequest } from './util';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState<IAuth | null>();

  useEffect(() => {
    const user = getLocalStorage('user');
    const token = getLocalStorage('token');

    if (user && token) {
      setAuth({ user, token, authorized: true });
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    setAuth(response);
  }

  function logout() {
    setAuth(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ ...auth, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

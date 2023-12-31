import React, { createContext, useCallback, useState, useContext, PropsWithChildren } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RevenueManager:token');
    const user = localStorage.getItem('@RevenueManager:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user)};
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('auth/authenticate', {
      email,
      password,
    })
    const { token, user } = response.data;

    localStorage.setItem('@RevenueManager:token', token);
    localStorage.setItem('@RevenueManager:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@RevenueManager:token');
        localStorage.removeItem('@RevenueManager:user');

        setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem('@RevenueManager:user', JSON.stringify(user));
    setData({
      token: data.token,
      user
    } as AuthState);
  }, [setData, data.token]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

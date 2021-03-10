import React from 'react';
import { useLocalStorage } from '../components/useLocalStorage';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useLocalStorage('token');

  const logout = () => {
    setToken(null);
  };

  return <AuthContext.Provider value={[token, setToken, logout]}>{children}</AuthContext.Provider>;
};

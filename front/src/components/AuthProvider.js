import React from 'react';
import { useLocalStorage } from '../components/useLocalStorage';

export const AuthContext = React.createContext();
export const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useLocalStorage('token');
  return <AuthContext.Provider value={[token, setToken]}>{children}</AuthContext.Provider>;
};

import React, { useContext, useEffect } from 'react';
import { useLocalStorage } from '../components/useLocalStorage';
import { AuthContext } from './AuthProvider';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [selectedPerson, setSelectedPerson] = useLocalStorage('selectedPerson');
  return <UserContext.Provider value={{ selectedPerson, setSelectedPerson }}>{children}</UserContext.Provider>;
};

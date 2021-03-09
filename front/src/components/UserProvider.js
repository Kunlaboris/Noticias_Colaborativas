import React from 'react';
import { useLocalStorage } from '../components/useLocalStorage';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [selectedPerson, setSelectedPerson] = useLocalStorage('selectedPerson');
  return <UserContext.Provider value={{ selectedPerson, setSelectedPerson }}>{children}</UserContext.Provider>;
};

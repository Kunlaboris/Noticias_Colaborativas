import React, { useContext } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
//import { AuthContext } from '../components/AuthProvider';
import { FormRegister } from '../components/FormRegister';

export const Register = () => {
  //const [token, setToken] = useContext(AuthContext);
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <FormRegister />
      </main>
    </>
  );
};

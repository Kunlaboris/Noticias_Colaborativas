import React, { useContext } from 'react';
import { AvatarKunlaboris } from '../components/AvatarKunlaboris';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { FormLogin } from '../components/FormLogin';
import { AuthContext } from '../components/AuthProvider';
import { UserContext } from '../components/UserProvider';
import { Link, Redirect } from 'react-router-dom';

export const Login = () => {
  // const { selectedPerson } = React.useContext(UserContext);
  // const [token, setToken] = useContext(AuthContext);
  // const onSuccess = (responseBody) => setToken(responseBody.accessToken);

  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <div>Bienvenido a Kunlaboris</div>

        <FormLogin />
      </main>
    </>
  );
  // );
};

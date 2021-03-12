import React, { useContext } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { AuthContext } from '../components/AuthProvider';
import { FormEditUserProfile } from '../components/FormEditUserProfile';
import { useParams } from 'react-router-dom';

export const EditUserProfilePage = () => {
  // const [token, setToken] = useContext(AuthContext);

  // es un hook de React Router que se utiliza para acceder a la url
  const { id } = useParams();
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <FormEditUserProfile idUser={id} />
      </main>
    </>
  );
};

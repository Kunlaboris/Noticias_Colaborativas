import React, { useContext } from 'react';
import './TopBar.css';
import SearchIcon from '@material-ui/icons/Search';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { UserContext } from './UserProvider';
import { useHistory } from 'react-router-dom';

export const TopBar = () => {
  const { selectedPerson } = useContext(UserContext);
  const history = useHistory();

  return (
    <div id="topBar">
      <form>
        <fieldset>
          <input type="search" placeholder="Buscar..." />
          <button type="submit" className="search ">
            <SearchIcon style={{ color: '#2F80ED' }} fontSize="small" />
          </button>
        </fieldset>
      </form>
      {selectedPerson ? (
        <form onSubmit={(e) => localStorage.clear()}>
          <AvatarKunlaboris model="user" selectedPerson={selectedPerson} />
          <button type="submit">Salir</button>
        </form>
      ) : (
        <>
          <button className="login" onClick={(e) => history.push('/login')}>
            Iniciar sesión
          </button>
          <button className="register" onClick={(e) => history.push('/register')}>
            Crear cuenta
          </button>
        </>
      )}
    </div>
  );
};

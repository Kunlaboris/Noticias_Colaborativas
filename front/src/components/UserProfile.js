import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserProfile.css';
import { AuthContext } from './AuthProvider';
import { UserContext } from './UserProvider';
import { Button } from '@material-ui/core';

// FALTA PINTAR EL AVATAR EN UN DIV

export const UserProfile = (props) => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;

  const [profile, setProfile] = useState(0);
  const [token] = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch(`http://localhost:3050/api/v1/users/${id}/profile`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        // setSelectedPerson(json);
        setProfile(json.user);
        // para que borre el mensaje de error cuando devuelve la lista
        //   setErrorUser('');
      } else {
        //   setErrorUser('Ha sucedido un error');
      }
    };
    loadUser();
  }, []);

  const avatarImage = profile.foto
    ? `${REACT_APP_API_URL}/images/profiles/${profile.foto}`
    : '../img/avatar-kunlaboris.svg';

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //console.log({ profile, selectedPerson, id });

  if (profile === 0) {
    return (
      <div id="box-users-edit">
        <div className="box-name login">
          <h2 className="login">Tienes que hacer login para ver tu perfil</h2>
          <Button variant="outlined" color="primary" href={`/login`}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="box-users-edit">
      <div className="box-name">
        <h2>
          {profile.nombre} {profile.apellido_1} {profile.apellido_2}
        </h2>
      </div>
      <div className="user-avatar">
        <img src={avatarImage} widht="120px" alt="avatar" />
      </div>
      <div className="user-data">
        <h3>Nombre de usuario:</h3>
        <p className="nick">{profile.nickname}</p>
        <p className="id-by-user">
          <span>Tu ID de usuario:</span> {profile.id}
        </p>
        <h3>Biografia</h3>
        <p className="biography">{profile.biografia}</p>
        <p className="email">
          <span>Email:</span> {profile.email}
        </p>

        <h3>Fecha de nacimiento:</h3>
        <p>{new Date(profile.fecha_nacimiento).toLocaleString('es-ES', options)}</p>

        <h3>Usuario Kunlaboris desde:</h3>
        <p> {new Date(profile.fecha_creacion).toLocaleDateString('es-ES', options)}</p>

        {parseInt(id) === selectedPerson.id && (
          <>
            <Link to={`/users/${id}/edit`}>
              <button className="user">Edita tu perfil</button>
            </Link>
            <Link to={`/users/${id}/listnew`}>
              <button className="user">Lista de noticias</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

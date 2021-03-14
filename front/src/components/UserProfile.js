import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { UserContext } from './UserProvider';
import './BoxUser.css';

// FALTA PINTAR EL AVATAR EN UN DIV

export const UserProfile = (props) => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;

  const [profile, setProfile] = useState();
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

  //console.log({ profile, selectedPerson, id });

  if (!profile) {
    return (
      <div>
        <div>Tienes que hacer login para ver tu perfil</div>
        <div>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <h2>{profile.nombre}</h2>;<h2>{profile.apellido_1}</h2>;<h2>{profile.nickname}</h2>; */}
      <div id="box-users-edit">
        <div id="caja-datos">
          <h2 class="user">
            {profile.nombre} {profile.apellido_1} {profile.apellido_2}
          </h2>
        </div>
        {profile.foto && (
          <div>
            <img src={`${REACT_APP_API_URL}/images/profiles/${profile.foto}`} widht="100px" alt="avatar" />
          </div>
        )}
        <h3>Nombre de usuario:</h3>
        <p class="nick">{profile.nickname}</p>
        <p class="id">
          <div>Tu ID de usuario</div>
          <span>{profile.id}</span>
        </p>
        <h4>Biografia</h4>
        <p className="box-user">{profile.biografia}</p>
        <div class="correo">{profile.email}</div>
        <div class="fecha">
          <span>Fecha de nacimiento:</span>
          {profile.fecha_nacimiento}
        </div>
        <div class="fecha">
          <span>Usuario Kunlaboris desde:</span>
          {profile.fecha_creacion}
        </div>
        {parseInt(id) === selectedPerson.id && (
          <Link to={`/users/${id}/edit`}>
            <button className="editProfile">Edita tu perfil</button>
          </Link>
        )}
      </div>
    </>
  );
};

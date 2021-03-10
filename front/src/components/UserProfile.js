import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BoxUser.css';
import { AuthContext } from './AuthProvider';
import { UserContext } from './UserProvider';

export const UserProfile = (props) => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);

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

  console.log({ profile, selectedPerson, id });
  if (!profile) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h2>{profile.nombre}</h2>;<h2>{profile.apellido_1}</h2>;<h2>{profile.nickname}</h2>;
      <div id="box-users-edit">
        <div id="caja-datos">
          <h2 class="user">
            {profile.nombre} {profile.apellido_1} {profile.apellido_2}
          </h2>
        </div>
        <img src="avatar-kunlaboris.svg" widht="100px" alt="avatar" />
        <h3>Nombre de usuario:</h3>
        <p class="nick">Nickname</p>
        <p class="id">
          <span>Id:</span> 123456
        </p>
        <h4>Biografia</h4>
        <p className="box-user">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi exercitationem veritatis quis dolorem! Quod
          ducimus consequatur nisi. Possimus fugiat, aspernatur saepe quisquam cupiditate sed dolore recusandae corporis
          voluptatibus labore natus?
        </p>
        <div class="correo">
          <span>Email:</span> dirección@dominio.com
        </div>
        <div class="fecha">
          <span>Fecha de nacimiento:</span>
          15 de septiembre de 1978
        </div>
        {parseInt(id) === selectedPerson.id && <Link to={`/users/${id}/edit`}></Link>}
      </div>
    </>
  );
};

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import { useLocalStorage } from '../components/useLocalStorage';

import { AuthContext } from '../components/AuthProvider';

// !!!!!! FALTA METER EL AVATAR, BOTÓN UPLOAD FOTO
// FALTA EL FALLO DE LA FECHA

export const FormEditUserProfile = (props) => {
  const { idUser: id } = props;
  const { REACT_APP_API_URL } = process.env;

  // defino un nuevo estado para manejar el contenido de este input
  // como el contenido del input es de tipo texto, el contenido inicial del estado va a ser la cadena vacia (" ")
  // onChange para que pueda escribir y cambiar el estado
  //handleChange es una función que recibe un evento
  // hasta que no use setEmail no veo ningún cambio en mi formulario
  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [biography, setBiography] = useState('');

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
        setFirstname(json.user.nombre);
        setLastname(json.user.apellido_1);
        setSurname(json.user.apellido_2);
        setNickname(json.user.nickname);
        setEmail(json.user.email);
        //setBirthDate(new Date(json.user.fecha_nacimiento).toLocaleDateString());
        setPassword(json.user.constrasena);
        setBiography(json.user.biografia);
      } else {
        setErrorMsg('Ha sucedido un error');
      }
    };
    loadUser();
  }, []);

  const handleEditUserProfile = async (e) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:3050/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        surname: surname,
        nickname: nickname,
        email: email,
        birthDate: '',
        password: password,
        repeatPassword: repeatPassword,
        biography: biography,
      }),
    });
    if (resp.ok) {
      const responseBody = await resp.json();

      /*  setFirstname('');
      setLastname(json.user.apellido_1);
      setSurname(json.user.apellido_2);
      setNickname(json.user.nickname);
      setEmail(json.user.email);
      setBirthDate(json.user.fecha_nacimiento);
      setPassword(json.user.contrasena);
      setBiography(json.user.biografia); */
    } else {
      history.push('/');
      // mostrar mensaje de error
      setErrorMsg('Error 1');
    }
  };
  return (
    <>
      <div class="container">
        <h2>Edita tu perfil</h2>
      </div>
      <div>
        <form onSubmit={handleEditUserProfile}>
          <div>
            <label htmlFor="firstname">Nombre</label>
            <input name="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>

          <div>
            <label htmlFor="lastname">Primer apellido</label>
            <input name="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>

          <div>
            <label htmlFor="surname">Segundo apellido</label>
            <input name="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>

          <div>
            <label htmlFor="nickname">Nombre de usuario</label>
            <input name="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label htmlFor="repeatPassword">Confirmar contraseña</label>
            <input
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="biography">Tu biografía</label>
            <textarea
              name="biography"
              type="text"
              rows="8"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          {errorMsg && <div>{errorMsg}</div>}

          <button type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
};

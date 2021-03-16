import React, { useState, useContext } from 'react';
import './FormRegister.css';
import { Link, useHistory } from 'react-router-dom';
//import { useLocalStorage } from '../components/useLocalStorage';

import { AuthContext } from '../components/AuthProvider';

// igual que en clases tenemos className en React, para formularios se usa htmlFor , y tiene que tener un name con el mismo valor que html for
// para que sea un input controlado, value = {algo}, este algo viene del estado

export const FormRegister = () => {
  // defino un nuevo estado para manejar el contenido de este input
  // como el contenido del input es de tipo texto, el contenido inicial del estado va a ser la cadena vacia (" ")
  // onChange para que pueda escribir y cambiar el estado
  //handleChange es una función que recibe un evento
  // hasta que no use setEmail no veo ningún cambio en mi formulario

  const history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [biography, setBiography] = useState('');

  // estado para guardar el token en el local storage
  // cada vez que uso setToken se me guarda el token en el localStorage

  // const [token, setToken] = useLocalStorage('token', '');

  // ahora lo saco del AuthContext
  const [token, setToken] = useContext(AuthContext);

  // estado para mensaje de error

  const [errorMsg, setErrorMsg] = useState('');

  // la petición POST se dispara en base a mi formulario submit
  // tengo que hacer otro manejador de evento de tipo (e)

  const handleRegisterUser = async (e) => {
    // esto se pone para que navegador no haga un GET por decefto
    e.preventDefault();
    const resp = await fetch('http://localhost:3050/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        surname: surname,
        nickname: nickname,
        email: email,
        birthDate: birthdate,
        password: password,
        repeatPassword: repeatPassword,
        biography: biography,
      }),
    });
    if (resp.ok) {
      // me quedo con el body de la respuesta
      const responseBody = await resp.json();
      // guardar el token
      //setToken(responseBody.accessToken);

      //TODO: meter en el usercontext el nombre y esas cosas...

      // porque ha ido todo bien, borro el email, el password, el resto de los elementos y el error, las vuelvo al valor inicial e.g. vacias
      setFirstname('');
      setLastname('');
      setSurname('');
      setNickname('');
      setEmail('');
      setBirthDate('');
      setPassword('');
      setRepeatPassword('');
      setBiography('');
      setErrorMsg('');

      //redirigimos a la portada
      history.push('/login');
    } else {
      // mostrar mensaje de error
      setErrorMsg('Se ha producido un error');
    }
  };

  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

  const [shown2, setShown2] = React.useState(false);
  const switchShown2 = (e) => {
    e.preventDefault();
    setShown2(!shown2);
  };
  /* const handleChange = (event) => {
    setEmail(event.target.value);
  }; */
  // fetch quse se conecta al back encodeURI, inpus enviar Email, se cargue POST al servidor
  return (
    <section id="user-profile" className="user-profile">
      <div className="container user">
        <h2>Crea tu cuenta</h2>

        <div>
          <form onSubmit={handleRegisterUser}>
            <div className="row">
              {/* /////////////////////////// Nombre */}
              <div className="col-third name">
                <h4>Nombre</h4>
                <div className="input-group input-group-icon">
                  <input
                    placeholder="Nombre (200 caracteres)"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fas fa-user-edit"></i>
                  </div>
                </div>
              </div>

              <div className="col-third name">
                <h4>Primer apellido</h4>
                <div className="input-group">
                  <input
                    placeholder="Primer apellido (50) caracteres"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-third name">
                <h4>Segundo apellido</h4>
                <div className="input-group">
                  <input
                    placeholder="segundo apellido (50) caracteres"
                    name="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <h4>Nickname</h4>
              <div className="input-group input-group-icon">
                <input
                  placeholder="Nombre (10) caracteres"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fab fa-kickstarter-k"></i>
                </div>
              </div>
            </div>

            {/* /////////////////////////// final de nombre */}
            <div className="row">
              <div className="col-half">
                <h4>Email</h4>
                <div className="input-group input-group-icon">
                  <input
                    placeholder="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fas fa-at"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Fecha de nacimiento</h4>
                <input id="date" type="date" value={birthdate} onChange={(e) => setBirthDate(e.target.value)} />
              </div>
            </div>
            {/* /////////////////////////////////////////////// fin de email y fecha nacimiento */}
            <div className="row">
              <div className="col-half">
                <h4>Contraseña</h4>
                <div className="input-group input-group-icon  left">
                  <input
                    name="password"
                    type={shown ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fas fa-unlock-alt"></i>
                  </div>
                  <button className="candado" onClick={switchShown}>
                    <i className={shown ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <div className="col-half">
                <h4>Confirmar contraseña</h4>
                <div className="input-group input-group-icon left">
                  <input
                    name="repeatPassword"
                    type={shown2 ? 'text' : 'password'}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <div className="input-icon">
                    <i className="fas fa-unlock-alt"></i>
                  </div>
                  <button className="candado" onClick={switchShown2}>
                    <i className={shown2 ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4>Tu biografía</h4>
              <textarea
                name="biography"
                type="text"
                rows="8"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>
            <button type="submit" className="register-boton">
              Enviar
            </button>
          </form>
        </div>
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
//import { useLocalStorage } from '../components/useLocalStorage';

//import { AuthContext } from '../components/AuthProvider';

// igual que en clases tenemos className en React, para formularios se usa htmlFor , y tiene que tener un name con el mismo valor que html for
// para que sea un input controlado, value = {algo}, este algo viene del estado

export const FormRegister = () => {
  // defino un nuevo estado para manejar el contenido de este input
  // como el contenido del input es de tipo texto, el contenido inicial del estado va a ser la cadena vacia (" ")
  // onChange para que pueda escribir y cambiar el estado
  //handleChange es una función que recibe un evento
  // hasta que no use setEmail no veo ningún cambio en mi formulario

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

  //const [token, setToken] = useLocalStorage('token', '');

  // ahora lo saco del AuthContext
  //const [token, setToken] = useContext(AuthContext);

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
    if (resp.status === 201) {
      // me quedo con el body de la respuesta
      const responseBody = await resp.json();
      // guardar el token
      //setToken(responseBody.accessToken);
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
    } else {
      // mostrar mensaje de error
      setErrorMsg('Se ha producido un error');
    }
  };

  /* const handleChange = (event) => {
    setEmail(event.target.value);
  }; */
  // fetch quse se conecta al back encodeURI, inpus enviar Email, se cargue POST al servidor
  return (
    <>
      <div>
        <h2>Crea tu cuenta</h2>
      </div>
      <div>
        <form onSubmit={handleRegisterUser}>
          <div>
            <label htmlFor="firstname">Nombre</label>
            <input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="lastname">Primer apellido</label>
            <input name="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor="surname">Segundo apellido</label>
            <input name="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor="nickname">Nombre de usuario</label>
            <input name="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              name="birthDate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthDate(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="repeatPassword">Confirmar contraseña</label>
            <input
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            ></input>
          </div>

          <div>
            <label htmlFor="biography">Tu biografía</label>
            <textarea
              name="biography"
              type="text"
              rows="8"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>
          </div>
          {errorMsg && <div>{errorMsg}</div>}

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

import React, { useState, useContext } from 'react';
import { useLocalStorage } from '../components/useLocalStorage';
import { AuthContext } from '../components/AuthProvider';
import { UserContext } from '../components/UserProvider';
import './FormRegister.css';

import { useHistory } from 'react-router-dom';
import { LinkedCameraOutlined } from '@material-ui/icons';

export const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  //NO ESTOY SEGURA QUE LOS NECESITO

  const { selectedPerson, setSelectedPerson } = React.useContext(UserContext);

  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');

  // ?????

  // const onSuccess = (responseBody) => setToken(responseBody.accessToken);

  ///////

  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:3050/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (resp.ok) {
      const responseBody = await resp.json();
      // console.log(responseBody);
      // onSuccess(responseBody);
      setEmail('');
      setPassword('');
      setErrorMsg('');

      setToken(responseBody.accessToken);
      setSelectedPerson(responseBody.user);

      history.push('/');
    } else {
      const errorMsg = await resp.json();
      setErrorMsg(errorMsg.error);
    }
  };
  return (
    <section id="user-profile" className="user-profile">
      <div className="container user">
        <h2>Bienvenidos a kunlaboris</h2>

        <div>
          <form onSubmit={handleLoginUser}>
            <div className="row">
              <h4>Email</h4>
              <div className="input-group input-group-icon">
                <input
                  placeholder="Nombre (10) caracteres"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-icon">
                  <i className="fab fa-kickstarter-k"></i>
                </div>
              </div>
            </div>

            <div className="row">
              <h4>Contraseña</h4>
              <div className="input-group input-group-icon left">
                <input
                  name="password"
                  type={shown ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-icon">
                  <i className="fas fa-unlock-alt"></i>
                </div>
                <button className="candado" onClick={switchShown}>
                  <i className={shown ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
              </div>
            </div>
            {errorMsg && <div>{errorMsg}</div>}
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

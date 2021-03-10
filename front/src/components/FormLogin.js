import React, { useState, useContext } from 'react';
import { useLocalStorage } from '../components/useLocalStorage';
import { AuthContext } from '../components/AuthProvider';
import { UserContext } from '../components/UserProvider';

import { useHistory } from 'react-router-dom';

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
    <form onSubmit={handleLoginUser}>
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
      </div>
      {errorMsg && <div>{errorMsg}</div>}
      <button type="submit">Enviar</button>
    </form>
  );
};

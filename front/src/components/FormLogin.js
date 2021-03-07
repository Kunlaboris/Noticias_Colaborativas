import React, { useState } from 'react';
import { useLocalStorage } from '../components/useLocalStorage';
import { AuthContext } from '../components/AuthProvider';
import { UserContext } from '../components/UserProvider';

export const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //NO ESTOY SEGURA QUE LOS NECESITO

  /* const { selectedPerson } = React.useContext(UserContext);
  const [token, setToken] = useContext(AuthContext);
 */
  const [errorMsg, serErrorMsg] = useState('');

  // ?????

  //const onSuccess = (responseBody) => setToken(responseBody.accessToken);

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
    if (resp.status === 201) {
      const responseBody = await resp.json();
      // onSuccess(responseBody);
      setEmail('');
      setPassword('');
      setErrorMsg('');
    } else {
      const errorMsg = await resp.json();
      setErrorMsg('Se ha producido un error');
    }
  };
  return (
    <form onSubmit={handleLoginUser}>
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      {errorMsg && <div>{errorMsg}</div>}
      <button type="submit">Enviar</button>
    </form>
  );
};

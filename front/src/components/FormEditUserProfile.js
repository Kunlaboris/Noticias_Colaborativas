import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import { useLocalStorage } from '../components/useLocalStorage';
import './FormEditUserProfile.css';
import { AuthContext } from '../components/AuthProvider';
import { Button } from '@material-ui/core';
import { UserContext } from './UserProvider';

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

  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [photoNew, setPhotoNew] = useState('');

  // para hacer las fechas hacemos esto:
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

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
        setPhoto(json.user.foto);
        setBirthDate(json.user.fecha_nacimiento);
        setDay(new Date(json.user.fecha_nacimiento).getDate());
        setMonth(new Date(json.user.fecha_nacimiento).getMonth() + 1);
        setYear(new Date(json.user.fecha_nacimiento).getFullYear());
        setPassword(json.user.constrasena);
        setBiography(json.user.biografia);
      } else {
        setErrorMsg('Ha sucedido un error');
      }
    };
    loadUser();
  }, []);

  console.log(photoNew);
  const handleUploadNewPhoto = async (e) => {
    e.preventDefault();
    const forData = new FormData();
    forData.append('avatar', photoNew);

    const response = await fetch('http://localhost:3050/api/v1/users/upload', {
      method: 'PATCH',
      headers: {
        //   'Content-Type': 'multipart/form-data',
        //   Accept: 'application/json',
        //   type: 'formData',
        Authorization: `Bearer ${token}`,
      },
      body: forData,
    });
    if (response.ok) {
      const contentBody = await response.json();
      console.log(contentBody);
      console.log(selectedPerson);
      setSelectedPerson({ ...selectedPerson, foto: contentBody.avatar });
      setPhoto(contentBody.avatar);
      setPhotoNew('');
    } else {
      // mostrar mensaje de error
      setErrorMsg('Error update avatar');
    }
  };

  const handleEditUserProfile = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrorMsg('contraseña ');
      return;
    }
    const birthDateModified = `${year}-${month}-${day}`;
    console.log(birthDateModified);
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
        birthDate: birthDateModified,
        password: password,
        repeatPassword: repeatPassword,
        biography: biography,
      }),
    });
    if (resp.ok) {
      const responseBody = await resp.json();
      console.log(responseBody);

      /*  setFirstname('');
      setLastname(json.user.apellido_1);
      setSurname(json.user.apellido_2);
      setNickname(json.user.nickname);
      setEmail(json.user.email);
      setBirthDate(json.user.fecha_nacimiento);
      setPassword(json.user.contrasena);
      setBiography(json.user.biografia); */

      history.push(`/users/${id}`);
    } else {
      // mostrar mensaje de error
      setErrorMsg('Error 1');
    }
  };

  const avatarImage = photo ? `${REACT_APP_API_URL}/images/profiles/${photo}` : '../../img/avatar-kunlaboris.svg';
  const SelectPhotoNew = () => {
    return (
      <>
        <input type="file" className="upload-photo" onChange={(e) => setPhotoNew(e.target.files[0])} />
        <i className="fa fa-camera"></i>
      </>
    );
  };
  const UploadPhotoNew = () => {
    return (
      <button className="camera" onClick={handleUploadNewPhoto}>
        <i className="fa fa-upload"></i>
      </button>
    );
  };

  return (
    <section id="user-profile" className="user-profile">
      <div className="container user">
        <h2>
          Edita tu perfil <span>{nickname}</span>
        </h2>
        <form onSubmit={handleEditUserProfile}>
          <div className="avatar-loader">
            <img src={avatarImage} widht="100px" alt="avatar" />

            {photoNew ? <UploadPhotoNew /> : <SelectPhotoNew />}
          </div>
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
                  placeholder="Nombre () caracteres"
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
                  placeholder="Nombre () caracteres"
                  name="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* /////////////////////////// final de nombre */}
          <div className="row">
            <div className="col-half">
              <h4>Email</h4>
              <div className="input-group input-group-icon">
                <input
                  placeholder="Nombre () caracteres"
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
              <h4>Fecha de nacimiento (D-M-Y)</h4>
              <div className="input-group">
                <div className="col-third">
                  <input type="text" placeholder="DD" value={day} name="day" onChange={(e) => setDay(e.target.value)} />
                </div>
                <div className="col-third">
                  <input
                    type="text"
                    placeholder="MM"
                    value={month}
                    name="month"
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </div>
                <div className="col-third">
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={year}
                    name="year"
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////////////// fin de email y fecha nacimiento */}
          <div className="row">
            <div className="col-half">
              <h4>Contraseña</h4>
              <div className="input-group input-group-icon">
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="input-icon">
                  <i className="fas fa-unlock-alt"></i>
                </div>
              </div>
            </div>

            <div className="col-half">
              <h4>Confirmar contraseña</h4>
              <div className="input-group input-group-icon">
                <input
                  name="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <div className="input-icon">
                  <i className="fas fa-unlock-alt"></i>
                </div>
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

          <Button variant="outlined" onClick={handleEditUserProfile}>
            Guardar tu perfil
          </Button>
        </form>
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    </section>
  );
};

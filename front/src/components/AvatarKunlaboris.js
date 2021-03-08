import React from 'react';
import { useRemoteUser } from '../api/useRemoteUser';
import './AvatarKunlaboris.css';

export const AvatarKunlaboris = (props) => {
  const { model, idUser, data } = props;

  const { user } = useRemoteUser();

  if (!user) {
    return null;
  } else {
    const userName = user.find((user) => idUser === user.id);
    if (model === 'user') {
      return (
        <div id="avatar-user">
          <img src="./img/avatar-kunlaboris.svg" alt="Avatar" className="color-avatar" />
          <div id="nameAvatar">
            {user[0].nombre} {user[0].apellido_1} {user[0].apellido_2}
          </div>
        </div>
      );
    } else if (model === 'data') {
      const userName = user.find((user) => idUser === user.id);

      return (
        <div id="avatar-data">
          <img src="./img/avatar-kunlaboris.svg" alt="Avatar" className="color-avatar" />
          <div id="dataAvatar">
            <h5>{data}</h5>
            <p>
              {userName.nombre} {userName.apellido_1} {userName.apellido_2}
            </p>
          </div>
        </div>
      );
    }
  }
};

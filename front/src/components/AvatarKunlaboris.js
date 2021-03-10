import React, { useContext, useEffect } from 'react';
import { useRemoteUser } from '../api/useRemoteUser';
import './AvatarKunlaboris.css';
import { UserContext } from './UserProvider';

export const AvatarKunlaboris = (props) => {
  const { model, idUser, data, selectedPerson } = props;
  console.log(selectedPerson);
  const { userPerson } = useRemoteUser();

  if (!userPerson) {
    return null;
  } else {
    if (model === 'user') {
      return (
        <div id="avatar-user">
          <img src="./img/avatar-kunlaboris.svg" alt="Avatar" className="color-avatar" />
          <div id="nameAvatar" key={selectedPerson.id}>
            {selectedPerson.nombre} {selectedPerson.apellido_1} {selectedPerson.apellido_2}
          </div>
        </div>
      );
    } else if (model === 'data') {
      const userName = userPerson.find((user) => idUser === user.id);

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

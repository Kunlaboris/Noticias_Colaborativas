import React from 'react';
import './AvatarKunlaboris.css';

export const AvatarKunlaboris = (props) => {
  const { model } = props;
  console.log(model);
  return (
    <div id="avatar-user">
      <img src="./img/avatar-kunlaboris.svg" alt="Avatar" className="color-avatar" />
      <div id="nameAvatar">Nombre Apellido1</div>
    </div>
  );
};

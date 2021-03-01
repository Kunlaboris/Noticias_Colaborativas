import React from 'react';

export const AvatarKunlaboris = (props) => {
  const { model } = props;
  console.log(model);
  return (
    <div id="avatar-user">
      <img src="./img/avatar-kunlaboris.svg" alt="Avatar" />
      <div id="nameAvatar">Nombre Apellido1</div>
    </div>
  );
};

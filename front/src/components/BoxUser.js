import './BoxUser.css';

export const BoxUser = () => {
  return (
    <div id="box-users-edit">
      <div id="caja-datos">
        <h2 class="user">Nombre Apellido1 Apellido2</h2>
      </div>
      <img src="avatar-kunlaboris.svg" widht="100px" alt="avatar" />
      <h3>Nombre de usuario:</h3>
      <p class="nick">Nickname</p>
      <p class="id">
        <span>Id:</span> 123456
      </p>
      <h4>Biografia</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi exercitationem veritatis quis dolorem! Quod
        ducimus consequatur nisi. Possimus fugiat, aspernatur saepe quisquam cupiditate sed dolore recusandae corporis
        voluptatibus labore natus?
      </p>
      <div class="correo">
        <span>Email:</span> dirección@dominio.com
      </div>
      <div class="fecha">
        <span>Fecha de nacimiento:</span>
        15 de septiembre de 1978
      </div>
    </div>
  );
};

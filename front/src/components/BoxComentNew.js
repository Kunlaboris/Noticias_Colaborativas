import './BoxComentNew.css';

export const MiniBoxBio = (props) => {
  return (
    <div>
      <h2 id="titulo-box">Comentarios</h2>
      <div id="box-coment-new">
        <img src="./avatarkunlaboris.svg" width="40px" />
        <div id="box-coment-user">
          <h3>Nickname</h3>
          <p class="mailto">mail@dominio.com</p>
          <div class="fecha-hora">
            02/02/2021<span> 10:58</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipiscing elit mi cum odio,estibulum aliquet in dis.Lorem ipsum
            dolor sit amet consectetur, adipiscing elit mi cum odio,estibulum aliquet in dis.Lorem ipsum dolor sit amet
            consectetur, adipiscing elit mi cum .
          </p>
        </div>
      </div>
    </div>
  );
};

import './ArticleNew.css';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { FaceKunla } from './FaceKunla';

export const ArticleNews = (props) => {
  return (
    <article key={props.new.id}>
      <div id="header-article">
        <img src="./img/Foto-Prueba-Kunlaboris-peq.jpg" alt="foto-noticia" />

        <div id="voting">
          <FaceKunla format="square" state="happy" idNew={props.new.id} vote={props.new.vpos} />
          <FaceKunla format="square" state="sad" idNew={props.new.id} vote={props.new.vneg} />
        </div>
      </div>
      <div id="body-article">
        <AvatarKunlaboris
          className="avatar"
          date={props.new.fecha_publicacion}
          name={`${props.new.nombre} ${props.new.apellido_1}`}
          photo={props.new.foto}
          id={props.new.id_usuario}
        />
        <h1 className="title">
          <a href="">{props.new.titulo}</a>
        </h1>
        <p className="excerpt"> {props.new.entradilla} </p>
      </div>
    </article>
  );
};

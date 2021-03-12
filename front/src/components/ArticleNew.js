import './ArticleNew.css';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { FaceKunla } from './FaceKunla';

export const ArticleNews = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const newImage = props.new.miniatura
    ? `${REACT_APP_API_URL}/images/news/${props.new.miniatura}`
    : './img/Foto-Prueba-Kunlaboris-peq.jpg';

  return (
    <article key={props.new.id}>
      <div id="header-article">
        <img src={newImage} alt="foto-noticia" />

        <div id="voting">
          <FaceKunla
            format="square"
            state="happy"
            idNew={props.new.id}
            vote={props.new.vpos}
            idUser={props.new.id_user}
          />
          <FaceKunla
            format="square"
            state="sad"
            idNew={props.new.id}
            vote={props.new.vneg}
            idUser={props.new.id_user}
          />
        </div>
      </div>
      <div id="body-article">
        <AvatarKunlaboris
          className="avatar"
          date={props.new.fecha_publicacion}
          name={`${props.new.nombre} ${props.new.apellido_1} ${props.new.apellido_2}`}
          photo={props.new.avatar}
          id={props.new.id_usuario}
        />
        <h1 className="title">
          <a href={`news/${props.new.id}`}>{props.new.titulo}</a>
        </h1>
        <p className="excerpt"> {props.new.entradilla} </p>
      </div>
    </article>
  );
};

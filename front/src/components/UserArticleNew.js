import { Button } from '@material-ui/core';
import './ArticleNew.css';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { FaceKunla } from './FaceKunla';

export const UserArticleNew = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const newImage = props.new.miniatura
    ? `${REACT_APP_API_URL}/images/news/${props.new.miniatura}`
    : './img/Foto-Prueba-Kunlaboris-peq.jpg';

  //   async function deleteNews(id) {
  //     // const indexNews = news.findIndex((news) => news.id === event);
  //     // const deleteOfList = newNews.splice(indexNews, 1);
  //     // console.log(deleteOfList[0].id);

  //     /// COMPROBAR LA URL

  //     await fetch(`http://localhost:3050/news/${id}`, {
  //       method: 'DELETE',
  //     });
  //     return setNews(newNews);
  //   }

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
      {/* <div className="button-edit">
        <button onClick={`/login`}>Editar</button>
        <button onClick={() => deleteNews(props.new.id)}>Borrar</button>
      </div> */}
    </article>
  );
};

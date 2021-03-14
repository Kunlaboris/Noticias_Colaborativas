import { FaceKunla } from './FaceKunla';
import './MiniBoxVoto.css';

export const MiniBoxVoto = (props) => {
  const { face, news } = props;
  return (
    <div className="mini-box-voto">
      <div id="box-new">
        <div className="face">
          <FaceKunla
            format="round"
            state={face}
            idNew={news.id}
            vote={face === 'happy' ? news.vpos : news.vneg}
            idUser={news.id_user}
          />
        </div>
        <p className="title-new">
          <a href={`/news/${news.id_user}`}>{news.titulo}</a>
        </p>
      </div>

      <div id="box-user">
        <h5>
          <span>Autor:</span> {news.nombre} {news.apellido_1}
          <span> publicado el</span> {new Date(news.fecha_publicacion).toLocaleDateString()}
        </h5>
      </div>
    </div>
  );
};

import './ArticleNew.css';
import { useRemoteVoting } from '../api/useRemoteVotingNews';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { FaceKunla } from './FaceKunla';

export const ArticleNews = (props) => {
  const { voting } = useRemoteVoting();

  if (!voting) {
    return null;
  } else {
    const votingNews = voting.find((vote) => vote.id_noticia === parseInt(props.new.id));

    return (
      <article key={props.new.id}>
        <div id="header-article">
          <img src="./img/Foto-Prueba-Kunlaboris-peq.jpg" alt="foto-noticia" />

          <div id="voting">
            <FaceKunla format="square" state="happy" idNew={props.new.id}>
              {!votingNews ? '0' : votingNews.votos_positivos}
            </FaceKunla>
            <FaceKunla format="square" state="sad" idNew={props.new.id}>
              {!votingNews ? '0' : votingNews.votos_negativas}
            </FaceKunla>
          </div>
        </div>
        <div id="body-article">
          <AvatarKunlaboris
            className="avatar"
            model="data"
            idUser={props.new.id_usuario}
            data={props.new.fecha_publicacion}
          />
          <h1 className="title">
            <a href="">{props.new.titulo}</a>
          </h1>
          <p className="excerpt"> {props.new.entradilla} </p>
        </div>
      </article>
    );
  }
};

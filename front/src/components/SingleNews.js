import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserProvider';
import { AuthContext } from './AuthProvider';
import './SingleNews.css';
import { FaceKunla } from './FaceKunla';
import { AvatarKunlaboris } from './AvatarKunlaboris';
import { Link } from '@material-ui/core';
import { DeleteNews } from './DeleteNews';
import { useRemoteVotingNewsById } from '../api/useRemoteVotingNewsById';

export const SingleNews = (props) => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const { hasAlreadyVoted } = useRemoteVotingNewsById();
  const [news, setNews] = useState('');
  const [newserror, setErrorNews] = useState('');
  const [token] = useContext(AuthContext);
  const { id } = useParams();

  // const findUser = hasAlreadyVoted.some((user) => user.id_usuario === selectedPerson.id);
  // const findnew = findUser.some((news) => news.id_noticia === id);
  // console.log(findnew);

  useEffect(async () => {
    const response = await fetch(`http://localhost:3050/api/v1/news/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      setNews(json.data);
      // SALE OK, status code 200
    } else {
      setErrorNews('Error: No se ha podido cargar la noticia');
    }
  }, []);
  // console.log(selectedPerson);

  const newImage = news.foto ? `${REACT_APP_API_URL}/images/news/${news.foto}` : './img/Foto-Prueba-Kunlaboris-peq.jpg';
  const optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <>
      <div id="publicacion">
        <h1 className="encabezado">{news.titulo}</h1>

        <img src={newImage} className="imagen-1" />

        <h3 className="temas">
          <span>Tema: </span>
          {news.nombre_categoria}
        </h3>
        <div className="author">
          <AvatarKunlaboris
            className="avatar"
            textAvatar="Autor"
            name={`${news.nombre} ${news.apellido_1} ${news.apellido_2}`}
            photo={news.avatar}
            id={news.id_usuario}
          />
          <p className="biography">{news.biografia}</p>
        </div>
        <div className="fecha">
          <h4>FECHA DE PUBLICACIÓN:</h4>
          <p className="day-and-time">{new Date(news.fecha_publicacion).toLocaleDateString('es-ES', optionsDate)}</p>
        </div>
        <div className="votaciones">
          <FaceKunla format="round" state="happy" idNew={news.id} vote={news.vpos} idUser={news.id_user} />
          <FaceKunla format="round" state="sad" idNew={news.id} vote={news.vneg} idUser={news.id_user} />
        </div>
        <div className="entradilla">{news.entradilla}</div>
        <div className="texto-noticia">
          <p>{news.texto}</p>
        </div>
        {parseInt(news.id_usuario) === selectedPerson.id && (
          <>
            <Link to={`/news/${id}/edit`}>
              <button className="news-single">
                <i className="far fa-edit"></i> Editar la noticia
              </button>
            </Link>
            <DeleteNews id={id} redirect={`/`} clase="news-single" />
          </>
        )}
      </div>
    </>
  );
};

import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from './UserProvider';
import { AuthContext } from './AuthProvider';
import './SingleNews.css';

// FALTA LA FOTO

export const SingleNews = () => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;

  const [news, setNews] = useState('');
  const [newserror, setErrorNews] = useState('');
  const [token] = useContext(AuthContext);
  const { id } = useParams();
  const { userId } = useParams();

  /* const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [lead, setLead] = useState('');
  const [text, setText] = useState(''); */

  useEffect(() => {
    const loadSingleNews = async () => {
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
        console.log(json.data);
      } else {
        setErrorNews('Error: No se ha podido cargar la noticia');
      }
    };
    loadSingleNews();
  }, []);

  return (
    <>
      <div>
        {news.titulo}
        <div>
          <img src="" alt="FOTO DE LA NOTICIA" />
        </div>
        <div>{news.fecha_publicacion}</div>
        <div>{selectedPerson.nickname}</div>

        <div>{news.entradilla}</div>
        <div>{news.texto}</div>

        <div>
          {' '}
          {parseInt(news.id_usuario) === selectedPerson.id && (
            <Link to={`/news/${id}/edit`}>
              <button>Editar la noticia</button>
            </Link>
          )}
        </div>

        <div>IMPORTAR LA FUNCIÓN DE DELETE NEWS</div>
      </div>
    </>
  );
};

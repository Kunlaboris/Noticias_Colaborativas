import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from './UserProvider';
import { AuthContext } from './AuthProvider';

import './SingleNews.css';

// hacemos una petición al servidor para obtener los detalles de ese usuario

export const SingleNews = (props) => {
  const { selectedPerson, setSelectedPerson } = useContext(UserContext);
  //const id = props.id;
  const { REACT_APP_API_URL } = process.env;

  const [news, setNews] = useState();
  const [token] = useContext(AuthContext);
  const { id } = useParams;

  /*   useEffect(() =>

  ); */

  return (
    <>
      <div>
        <div>Título de la Noticia</div>
        <div>
          <img src="" />
        </div>
        <div>Entradilla de la noticia</div>
        <div>Cuerpo de la noticia</div>

        {parseInt(id) === selectedPerson.id && (
          <Link to={`/news/${id}/edit`}>
            <button>Edita la noticia</button>
          </Link>
        )}
      </div>
    </>
  );
};

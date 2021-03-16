import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router-dom';

export const DeleteNews = ({ id, redirect, clase }) => {
  const [token] = useContext(AuthContext);
  const history = useHistory();

  async function deleteNews(e) {
    e.preventDefault();
    if (confirm('Estas segur@ de borrar la noticia')) {
      // const indexNews = news.findIndex((news) => news.id === event);
      // const deleteOfList = newNews.splice(indexNews, 1);
      // console.log(deleteOfList[0].id);

      /// COMPROBAR LA URL

      await fetch(`${process.env.REACT_APP_API_URL}/api/v1/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      history.push(redirect);
    }
  }
  return (
    <button onClick={deleteNews} className={clase && clase}>
      <i className="fas fa-eraser"></i> Eliminar noticia
    </button>
  );
};

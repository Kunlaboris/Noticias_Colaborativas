import React, { useContext, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';

import { BoxBiography } from '../components/BoxBiography';
import { UserArticleNew } from '../components/UserArticleNew';
import { useUploadNews } from '../api/useUploadNews';
import { BoxNotiVotos } from '../components/BoxNotiVotos';
import { UserContext } from '../components/UserProvider';
import { Button, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from '../components/AuthProvider';
import { Link } from 'react-router-dom';
import { DeleteNews } from '../components/DeleteNews';

export const UserListNews = () => {
  const { news, setNews, errorNews } = useUploadNews();
  const { selectedPerson } = useContext(UserContext);
  const [token] = useContext(AuthContext);

  async function deleteNews(id) {
    // const indexNews = news.findIndex((news) => news.id === event);
    // const deleteOfList = newNews.splice(indexNews, 1);
    // console.log(deleteOfList[0].id);
    console.log(id);

    /// COMPROBAR LA URL

    // await fetch(`http://localhost:3050/api/v1/news/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // return setNews(newNews);
  }

  const filteredNews = news.filter((post) => selectedPerson.id === post.id_usuario);

  // console.log(filteredNews);
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        {filteredNews.map((post) => (
          <>
            <div className="button-edit">
              <Link to={`/news/${post.id}/edit`}>
                <button>
                  <i className="far fa-edit"></i> Editar noticia
                </button>
              </Link>
              <DeleteNews id={post.id} redirect={`/`} />
            </div>
            <UserArticleNew key={post.id} new={post} />
          </>
        ))}

        {filteredNews.length === 0 && <div className="news-vacio">Tu busqueda no tiene ninguna respuesta</div>}
      </main>
      <div className="top-footer">Trabajo realizado por: Anamaria, Monica y Armando</div>
    </>
  );
};

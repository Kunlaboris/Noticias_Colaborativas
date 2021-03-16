import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';

import { BoxBiography } from '../components/BoxBiography';
import { ArticleNews } from '../components/ArticleNew';
import { useUploadNews } from '../api/useUploadNews';
import { BoxNotiVotos } from '../components/BoxNotiVotos';
import { BoxUser } from '../components/BoxUser';
import { useRemoteCategory } from '../api/useRemoteCategory';
import Loading from '../components/Loading';

export const LatestNews = () => {
  const { categories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);
  const { news, setNews, errorNews } = useUploadNews();
  const [dateToFilter, setDateToFilter] = useState(new Date());
  const [categoryToFilter, setCategoryToFilter] = useState('');

  if (!news.length) return <Loading />;

  const filteredNews = news
    .filter(
      (post) => new Date(post.fecha_publicacion).toLocaleDateString() === new Date(dateToFilter).toLocaleDateString()
    )
    .filter((post) => categoryToFilter === '' || parseInt(categoryToFilter) === post.id_cat);

  // if (filteredNews === []) {
  //   <div>Ninguna noticia</div>;
  // }
  console.log(filteredNews);
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <div className="filter-bar">
          <h2>
            <i className="fas fa-newspaper"></i> Filtros
          </h2>
          <select onChange={(e) => setCategoryToFilter(e.target.value)} className="filter">
            <option value="">Todos los temas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        {filteredNews.map((post) => (
          <ArticleNews key={post.id} new={post} />
        ))}

        {filteredNews.length === 0 && (
          <div className="news-vacio">
            <i class="far fa-eye-slash"></i> Tu busqueda no tiene ninguna respuesta
          </div>
        )}
      </main>

      <footer>
        <BoxNotiVotos face="happy" news={news} />
        <BoxNotiVotos face="sad" news={news} />
        <BoxBiography />
      </footer>
      <div className="top-footer">Trabajo realizado por: Anamaria, Monica y Armando</div>
    </>
  );
};

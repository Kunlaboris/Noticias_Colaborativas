import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';

import { BoxBiography } from '../components/BoxBiography';
import { ArticleNews } from '../components/ArticleNew';
import { useUploadNews } from '../api/useUploadNews';
import { BoxNotiVotos } from '../components/BoxNotiVotos';
import { BoxUser } from '../components/BoxUser';
import { useRemoteCategory } from '../api/useRemoteCategory';

export const LatestNews = () => {
  const { categories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);
  const { news, setNews, errorNews } = useUploadNews();
  const [dateToFilter, setDateToFilter] = useState(new Date());
  const [categoryToFilter, setCategoryToFilter] = useState('');

  //momentjs
  //date-fns

  const filteredNews = news
    .filter(
      (post) => new Date(post.fecha_publicacion).toLocaleDateString() === new Date(dateToFilter).toLocaleDateString()
    )
    .filter((post) => categoryToFilter === '' || parseInt(categoryToFilter) === post.id_cat);

  // if (filteredNews === []) {
  //   <div>Ninguna noticia</div>;
  // }

  console.log(!filteredNews);

  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <select onChange={(e) => setCategoryToFilter(e.target.value)}>
          <option value="">Todos los temas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {filteredNews.map((post) => (
          <ArticleNews key={post.id} new={post} />
        ))}

        {!!filteredNews && <div>Ninguna noticia</div>}
      </main>

      <footer>
        <BoxBiography />
        {<BoxNotiVotos />}
      </footer>
    </>
  );
};

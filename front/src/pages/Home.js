import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';

import { BoxBiography } from '../components/BoxBiography';
import { ArticleNews } from '../components/ArticleNew';
import { useUploadNews } from '../api/useUploadNews';
import { BoxNotiVotos } from '../components/BoxNotiVotos';
import { BoxUser } from '../components/BoxUser';
import { useRemoteCategory } from '../api/useRemoteCategory';

export const Home = () => {
  const { categories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);
  const { news, setNews, errorNews } = useUploadNews();
  const [dateToFilter, setDateToFilter] = useState(new Date());
  const [categoryToFilter, setCategoryToFilter] = useState('');
  /* setDateToFilter('2021-03-11 07:02:16'); */
  // console.log(dateToFilter);  ************************************ hay que activarlo
  //momentjs
  //date-fns

  const filteredNews = news
    // .filter((post) => post.fecha_publicacion === '');
    .filter((post) => categoryToFilter === '' || parseInt(categoryToFilter) === post.id_cat);

  // console.log(filteredNews);

  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <select onChange={(e) => setCategoryToFilter(e.target.value)}>
          <option value="">Seleccione un tema</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {filteredNews.map((post) => (
          <ArticleNews key={post.id} new={post} />
        ))}
      </main>

      <footer>
        <BoxBiography />
        {<BoxNotiVotos />}
      </footer>
    </>
  );
};

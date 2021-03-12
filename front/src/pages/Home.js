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
  // setDateToFilter();
  console.log(new Date(dateToFilter).toLocaleDateString());

  // ************************************ hay que activarlo
  //momentjs
  //date-fns

  const filteredNews = news
    .filter(
      (post) =>
        new Date(dateToFilter).toLocaleDateString() === new Date().toLocaleDateString() ||
        new Date(post.fecha_publicacion).toLocaleDateString() === new Date(dateToFilter).toLocaleDateString()
    )
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
          <option value="">Todos los temas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <input type="date" onChange={(e) => setDateToFilter(e.target.value)}></input>
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

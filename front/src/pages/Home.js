import React, { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';

import { BoxBiography } from '../components/BoxBiography';
import { ArticleNews } from '../components/ArticleNew';
import { useUploadNews } from '../api/useUploadNews';
import { BoxNotiVotos } from '../components/BoxNotiVotos';
import { BoxUser } from '../components/BoxUser';

export const Home = () => {
  const { news, setNews, errorNews } = useUploadNews();
  const [dateToFilter, setDateToFilter] = useState(new Date());
  const [categoryToFilter, setCategoryToFilter] = useState('');
  //momentjs
  //date-fns

  const filteredNews = news
    .filter((post) => post.date === dateToFilter)
    .filter((post) => categoryToFilter === '' || post.categoria === categoriaToFilter);

  console.log(news);
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        {filteredNews.map((post) => (
          <ArticleNews key={post.id} new={post} />
        ))}
        <select onChange={(e) => setCategoryToFilter(e.target.value)}>
          <option value="categoria1">Categoría 1</option>
        </select>
      </main>

      <footer>
        <BoxBiography />
        {<BoxNotiVotos />}
      </footer>
    </>
  );
};

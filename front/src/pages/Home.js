import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { BoxBiography } from '../components/BoxBiography';
import { ArticleNews } from '../components/ArticleNew';
import { useUploadNews } from '../api/useUploadNews';

export const Home = () => {
  const { news, setNews, errorNews } = useUploadNews();
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        {news.map((post) => (
          <ArticleNews key={post.id} new={post} />
        ))}
      </main>

      <footer>
        <BoxBiography />
      </footer>
    </>
  );
};

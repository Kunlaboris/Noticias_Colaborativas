import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { useUploadNews } from '../api/useUploadNews';
import { ArticleNewsByUser } from '../components/ArticleNewsByUser';

export const ListNewsByUser = () => {
  const { news } = useUploadNews();

  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        {news.map((post) => (
          <ArticleNewsByUser key={post.id} new={post} />
        ))}
      </main>
    </>
  );
};

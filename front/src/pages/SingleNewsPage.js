import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { SingleNews } from '../components/SingleNews';

export const SingleNewsPage = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <SingleNews />
      </main>
    </>
  );
};

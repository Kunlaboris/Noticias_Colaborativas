import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { FormAddNews } from '../components/FormAddNews';

export const AddNews = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <FormAddNews />
      </main>
    </>
  );
};

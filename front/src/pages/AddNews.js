import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { FormEditNews } from '../components/FormEditNews';

export const AddNews = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <FormEditNews />
      </main>
    </>
  );
};

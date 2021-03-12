import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { EditSingleNews } from '../components/EditSingleNews';

export const EditSingleNewsPage = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <EditSingleNews />
      </main>
    </>
  );
};

import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { BoxBiography } from '../components/BoxBiography';
import { BoxNotiVotos } from '../components/BoxNotiVotos';

export const Home = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <footer>
        <BoxBiography />
        <BoxNotiVotos />
      </footer>
    </>
  );
};

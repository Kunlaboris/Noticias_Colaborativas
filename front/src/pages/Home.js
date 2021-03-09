import React from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { BoxBiography } from '../components/BoxBiography';
<<<<<<< HEAD
import { BoxNotiVotos } from '../components/BoxNotiVotos';
=======
import { FaceKunla } from '../components/FaceKunla';
import { ArticleNews } from '../components/ArticleNew';
>>>>>>> 051325fe47120fde32c33c99ce414b8ead8a4622

export const Home = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <ArticleNews />
        {/* <FaceKunla format="round" state="happy" vote="10" />
        <FaceKunla format="round" state="sad" vote="8" />
        <FaceKunla format="square" state="happy" vote="6" />
        <FaceKunla format="square" state="sad" vote="12" /> */}
      </main>

      <footer>
        <BoxBiography />
        <BoxNotiVotos />
      </footer>
    </>
  );
};

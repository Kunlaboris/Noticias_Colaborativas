import React, { useContext } from 'react';
import { TopBar } from '../components/TopBar';
import { Menu } from '../components/Menu';
import { UserProfile } from '../components/UserProfile';
import { AvatarKunlaboris } from '../components/AvatarKunlaboris';

export const UserProfilePage = () => {
  return (
    <>
      <header>
        <TopBar />
        <Menu />
      </header>
      <main>
        <UserProfile />
      </main>
    </>
  );
};

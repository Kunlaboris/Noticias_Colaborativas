import React from 'react';
import './TopBar.css';
import SearchIcon from '@material-ui/icons/Search';
import { AvatarKunlaboris } from './AvatarKunlaboris';

export const TopBar = () => {
  return (
    <div id="topBar">
      <form>
        <fieldset>
          <input type="search" placeholder="Buscar..." />
          <button type="submit">
            <SearchIcon style={{ color: '#2F80ED' }} fontSize="small" />
          </button>
        </fieldset>
      </form>
      <AvatarKunlaboris model="user" idUser="1" />
    </div>
  );
};

import './BoxBiography.css';
import { MiniBoxBio } from './MiniBoxBio';

export const BoxBiography = () => {
  return (
    <div id="box-bio">
      <h2>Nuevos usuarios</h2>
      <MiniBoxBio />
      <MiniBoxBio />
      <MiniBoxBio />
    </div>
  );
};

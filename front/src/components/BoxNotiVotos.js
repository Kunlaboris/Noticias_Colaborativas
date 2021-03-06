import './BoxNotiVotos.css';
import { MiniBoxVoto } from './MiniBoxVoto';

export const BoxNotiVotos = () => {
  return (
    <div id="box-voto">
      <h2>Noticias más votadas</h2>
      <MiniBoxVoto />
      <MiniBoxVoto />
      <MiniBoxVoto />
    </div>
  );
};

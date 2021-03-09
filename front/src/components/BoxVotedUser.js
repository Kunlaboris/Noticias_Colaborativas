import './BoxVotedUser.css';
import { MiniBoxVotedUser } from './MiniBoxVotedUser';

export const BoxVotedUser = () => {
  return (
    <div id="box-user-voted">
      <h2>Noticias colaborativa que has valorado</h2>
      <MiniBoxVotedUser />
      <MiniBoxVotedUser />
      <MiniBoxVotedUser />
    </div>
  );
};

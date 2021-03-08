import './BoxBiography.css';
import { useRemoteUser } from '../api/useRemoteUser';
import { MiniBoxBio } from './MiniBoxBio';

export const BoxBiography = () => {
  const { user } = useRemoteUser();

  if (!user) {
    return null;
  } else {
    // const orderUser = user.sort((a, b) => a.fechas > b.fechas);
    // const orderUser = user.sort((a, b) => a.id < b.id);
    const threeUser = user.splice(0, 3);

    return (
      <div id="box-bio">
        <h2>Nuevos usuarios</h2>
        {threeUser.map((people) => (
          <MiniBoxBio key={people.id}>{people}</MiniBoxBio>
        ))}
      </div>
    );
  }
};

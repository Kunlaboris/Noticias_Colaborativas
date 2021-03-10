import './BoxBiography.css';
import { useRemoteUser } from '../api/useRemoteUser';
import { MiniBoxBio } from './MiniBoxBio';

export const BoxBiography = () => {
  const { userPerson } = useRemoteUser();
  console.log(userPerson);

  if (!userPerson) {
    return null;
  } else {
    // const orderUser = userPerson.sort((a, b) => a.fechas > b.fechas);
    // const orderUser = userPerson.sort((a, b) => a.id < b.id);
    const threeUser = userPerson.slice(0, 3);

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

import { useState, useEffect } from 'react';

export const useRemoteVotingNewsById = (idNew) => {
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState();

  useEffect(async () => {
    const response = await fetch(`http://localhost:3050/api/v1/voting/news/${idNew}`, {
      method: 'GET',
    });
    if (response.ok) {
      const json = await response.json();
      const arrayUserVoted = json.map((user) => user.id_usuario);
      setHasAlreadyVoted(arrayUserVoted);
    } else {
      console.log('Ha sucedido un error');
    }
    console.log('lista de usuarios', idNew, hasAlreadyVoted);
  }, []);
  return [hasAlreadyVoted, setHasAlreadyVoted];
};

import { useState, useEffect } from 'react';

export const useRemoteVotingNewsById = (idNew) => {
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState();

  useEffect(async () => {
    const response = await fetch(`http://localhost:3050/api/v1/voting/news/id`, {
      method: 'GET',
    });
    if (response.ok) {
      const json = await response.json();
      setHasAlreadyVoted(json);
    } else {
      console.log('Ha sucedido un error');
    }
  }, []);
  return { hasAlreadyVoted, setHasAlreadyVoted };
};

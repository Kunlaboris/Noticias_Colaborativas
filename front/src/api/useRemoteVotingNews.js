import { useState, useEffect } from 'react';

export const useRemoteVoting = (initialList) => {
  const [voting, setVoting] = useState(initialList);
  const [errorVoting, setErrorVoting] = useState('');

  useEffect(() => {
    const loadVoting = async () => {
      const response = await fetch('http://localhost:3050/api/v1/voting/news', {
        method: 'GET',
      });
      if (response.status === 200) {
        const json = await response.json();
        setVoting(json);
        setErrorVoting('');
      } else {
        setErrorVoting('Ha sucedido un error');
      }
    };
    loadVoting();
  }, []);
  return { voting, setVoting, errorVoting };
};

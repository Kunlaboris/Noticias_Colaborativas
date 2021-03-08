import { useState, useEffect } from 'react';

export const useRemoteUser = (initialList) => {
  const [user, setUser] = useState(initialList);
  const [errorUser, setErrorUser] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch('http://localhost:3050/api/v1/users', {
        method: 'GET',
      });
      if (response.status === 200) {
        const json = await response.json();
        setUser(json);
        setErrorUser('');
      } else {
        setErrorUser('Ha sucedido un error');
      }
    };
    loadUser();
  }, []);
  return { user, setUser, errorUser };
};

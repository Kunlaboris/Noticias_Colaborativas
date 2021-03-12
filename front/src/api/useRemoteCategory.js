import { useState, useEffect } from 'react';

export const useRemoteCategory = (initialList) => {
  const [categories, setCategories] = useState(initialList);
  useEffect(async () => {
    const response = await fetch('http://localhost:3050/api/v1/categories');
    const json = await response.json();
    setCategories(json);
  }, []);

  return { categories, setCategories };
};

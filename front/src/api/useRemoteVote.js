import { useState, useEffect } from 'react';

export const votingUserForNews = () => {
  useEffect(async () => {
    const response = await fetch('http://localhost:3000/api/v1/voting', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ idNews: '4', valuePositive: '1', valueNegative: '0' }),
    });
  }, []);
};

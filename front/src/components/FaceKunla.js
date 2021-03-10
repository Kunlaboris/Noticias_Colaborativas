import { useState } from 'react';

import './FaceKunla.css';

export const FaceKunla = (props) => {
  const [votes, setVotes] = useState(props.vote || 0);
  const { format, state, idNew } = props;

  let className = '';
  if (format === 'round') {
    className = 'face-round ' + state;
  } else {
    className = 'face-square ' + state;
  }

  async function voteNews(e) {
    // e.preventDefault();
    console.log(e);
    // let bodyVoting = {};
    // if ((e = 'happy')) {
    //   const bodyVoting = { idNews: `${props.idNew}`, valuePositive: '1', valueNegative: '0' };
    //   return bodyVoting;
    // } else if ((e = 'sad')) {
    //   const bodyVoting = { idNews: `${props.idNew}`, valuePositive: '0', valueNegative: '1' };
    //   return bodyVoting;
    // }

    const res = await fetch('http://localhost:3050/api/v1/voting', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idNews: `${props.idNew}`, valuePositive: '1', valueNegative: '0' }),
    });
    const voted = await res.json();
    const newListVoting = [...voting, voted];
    setVoting(newListVoting);
    console.log(res);
  }

  // const loadVoted = async () => {
  //   const response = await fetch(`http://localhost:3050/api/v1/voting/${idUser}/${props.idNew}`);
  //   const json = await response.json();
  //   if (json.length === 0) {
  //   } else {
  //   }
  // };

  // loadVoted();

  return (
    <>
      <div className={className} onClick={(e) => voteNews(props.state)}>
        <p className={format}>{votes} Votos</p>
      </div>
    </>
  );
};

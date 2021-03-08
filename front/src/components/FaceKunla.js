import { Children, useEffect } from 'react';
import { useRemoteVote } from '../api/useRemoteVote';
import { useRemoteVoting } from '../api/useRemoteVotingNews';
import './FaceKunla.css';

export const FaceKunla = (props) => {
  const { setVoting } = useRemoteVoting();
  const idUser = 9;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmlja25hbWUiOiJKYXZpUGUiLCJyb2wiOiJyZWFkZXIiLCJpYXQiOjE2MTUwODU4NjYsImV4cCI6MTYxNTk0OTg2Nn0.X-hSORoH8iqNrf83X2UNtXKFpoR5j-7akSnIku9j0tM';

  const { format, state, idNew } = props;

  let className = '';
  if (format === 'round') {
    className = 'face-round ' + state;
  } else {
    className = 'face-square ' + state;
  }
  let voteInNew = `${props.children}`;

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

  const loadVoted = async () => {
    const response = await fetch(`http://localhost:3050/api/v1/voting/${idUser}/${props.idNew}`);
    const json = await response.json();
    if (json.length === 0) {
    } else {
    }
  };

  loadVoted();

  return (
    <>
      <div className={className} onClick={(e) => voteNews(props.state)}>
        <p className={format}>{voteInNew} Votos</p>
      </div>
    </>
  );
};

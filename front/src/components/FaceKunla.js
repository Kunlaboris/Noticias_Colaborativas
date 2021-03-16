import { Tooltip } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

import './FaceKunla.css';
import { UserContext } from './UserProvider';

export const FaceKunla = (props) => {
  const [votes, setVotes] = useState(props.vote || 0);
  const [token] = useContext(AuthContext);
  const { selectedPerson, setHasAlreadyVoted } = useContext(UserContext);

  const selectedPersonId = !selectedPerson ? 0 : selectedPerson.id;

  const { format, state, idNew, vote, idUser } = props;
  const [errorMsg, setErrorMsg] = useState('');

  let eventOnClick = selectedPersonId === idUser ? voteNewsError : (e) => voteNews(props.state);

  let className = format === 'round' ? 'face-round ' + state : 'face-square ' + state;
  async function voteNewsError(e) {
    console.log('no puedes votar');
  }

  async function voteNews(e) {
    // e.preventDefault();
    const valueVoting = e === 'happy' ? { vPos: '1', vNeg: '0' } : { vPos: '0', vNeg: '1' };

    const res = await fetch('http://localhost:3050/api/v1/voting', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idNews: `${parseInt(idNew)}`,
        valuePositive: `${parseInt(valueVoting.vPos)}`,
        valueNegative: `${parseInt(valueVoting.vNeg)}`,
      }),
    });
    await res.json();
    const newListVoting = parseInt(votes) + 1;

    if (res.ok) {
      setVotes(newListVoting);
    } else {
      setErrorMsg('no puedes votar');
    }
    // console.log(voted);
    // console.log('antes de');
    // const newHasAlreadyVoted = [idUser];
    // setHasAlreadyVoted(newHasAlreadyVoted);
    // console.log('despues de');
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
    <Tooltip title={errorMsg} arrow>
      <div className={className} onClick={eventOnClick}>
        <p className={format}>{votes} Votos</p>
      </div>
    </Tooltip>
  );
};

// votes === undefined ? vote :

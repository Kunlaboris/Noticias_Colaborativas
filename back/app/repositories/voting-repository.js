'use strict';

const getPool = require('../infrastructure/database');

async function findVotesNews(idNews) {
  const connection = await getPool();
  const query = `SELECT id_noticia, 
  SUM(valoraciones_positivas) AS votos_positivos,
  SUM(valoraciones_negativas) AS votos_negativas,
  COUNT(id_usuario) AS total_votos
  FROM valoraciones GROUP BY id_noticia ORDER BY total_votos DESC`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

async function addVoteByIdUser(idUser, idNews, valuePositive, valueNegative) {
  const connection = await getPool();
  const insertQuery = `INSERT
 INTO valoraciones (id_usuario, id_noticia, valoraciones_positivas, valoraciones_negativas)
 VALUE (?, ?, ?, ?)`;
  const [create] = await connection.query(insertQuery, [idUser, idNews, valuePositive, valueNegative]);

  connection.release();
  return create.insertId;
}

async function findVotesByIdNew(idNews) {
  const connection = await getPool();
  const query = `SELECT * FROM valoraciones WHERE id_noticia = ?`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

async function findVotes() {
  const connection = await getPool();
  const query = `SELECT * FROM valoraciones`;
  const [voting] = await connection.query(query);

  connection.release();
  return voting;
}

async function findVotesByIdUser(idUser, idNews) {
  const connection = await getPool();
  const query = `SELECT * FROM valoraciones WHERE id_usuario = ? AND id_noticia = ?`;
  const [voting] = await connection.query(query, [idUser, idNews]);

  connection.release();
  return voting;
}

async function findVotesByIdUser2(idUser, idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) AS "count" FROM valoraciones WHERE id_usuario = ? AND id_noticia = ?`;
  const [voting] = await connection.query(query, [idUser, idNews]);

  connection.release();
  return voting;
}

async function findVotesPositiveByIdNews(idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) AS "Total votos positivos" FROM valoraciones WHERE id_noticia = ? AND valoraciones_positivas = 1`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

async function findVotesNegativeByIdNews(idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) AS "Total votos negativos" FROM valoraciones WHERE id_noticia = ? AND valoraciones_negativas = 1`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

async function updateVotingById(valuePositive, valueNegative, idVoting) {
  const connection = await getPool();
  const updateQuery = 'UPDATE valoraciones SET valoraciones_positivas = ?, valoraciones_negativas = ?  WHERE id = ?';
  await connection.query(updateQuery, [valuePositive, valueNegative, idVoting]);
  connection.release();

  return true;
}

async function removeVotingById(idVoting) {
  const connection = await getPool();
  const deleteQuery = 'DELETE FROM valoraciones WHERE id = ?';
  await connection.query(deleteQuery, idVoting);
  connection.release();

  return true;
}

module.exports = {
  addVoteByIdUser,
  findVotesByIdUser,
  findVotesByIdUser2,
  findVotes,
  findVotesByIdNew,
  findVotesNegativeByIdNews,
  findVotesNews,
  findVotesPositiveByIdNews,
  removeVotingById,
  updateVotingById,
};

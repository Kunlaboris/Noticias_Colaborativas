'use strict';

const getPool = require('../infrastructure/database');

async function addVoteByIdUser(idUser, idNews, valuePositive, valueNegative) {
  const connection = await getPool();
  const insertQuery = `INSERT
 INTO valoraciones (id_usuario, id_noticia, valoraciones_positivas, valoraciones_negativas)
 VALUE (?, ?, ?, ?)`;
  const [create] = await connection.query(insertQuery, [idUser, idNews, valuePositive, valueNegative]);

  connection.release();
  return create.insertId;
}

async function findVotesByIdUser(id, idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) AS "count" FROM valoraciones WHERE id_usuario = ? AND id_noticia = ?`;
  const voting = await connection.query(query, [id, idNews]);

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
  findVotesPositiveByIdNews,
  findVotesNegativeByIdNews,
  removeVotingById,
  updateVotingById,
};

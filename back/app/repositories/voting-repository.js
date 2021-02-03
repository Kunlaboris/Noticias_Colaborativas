'use strict';

const getPool = require('../infrastructure/database');

async function addVoteByIdUser(idUser, idNews, valuePositive, valueNegative) {
  const connection = await getPool();
  const insertQuery = `INSERT
 INTO usuario_noticia (id_usuario, id_noticia, valoraciones_positivas, valoraciones_negativas, fecha_valoracion)
 VALUE (?, ?, ?, ?, now())`;
  const [create] = await connection.query(insertQuery, [idUser, idNews, valuePositive, valueNegative]);

  connection.release();
  return create.insertId;
}

async function findVotesPositiveByIdNews(idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) FROM usuario_noticia WHERE id_noticia = ? AND valoraciones_positivas = 1`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

async function findVotesNegativeByIdNews(idNews) {
  const connection = await getPool();
  const query = `SELECT COUNT(*) FROM usuario_noticia WHERE id_noticia = ? AND valoraciones_negativas = 1`;
  const [voting] = await connection.query(query, idNews);

  connection.release();
  return voting;
}

module.exports = {
  addVoteByIdUser,
  findVotesPositiveByIdNews,
  findVotesNegativeByIdNews,
};

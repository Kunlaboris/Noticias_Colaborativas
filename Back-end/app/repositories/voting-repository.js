'use strict';

const database = require('../infrastructure/database');

async function addVoteByIdUser(idUser, idNews, valuePositive, valueNegative) {
  const pool = await database.getPool();
  const insertQuery = `INSERT
 INTO usuario_noticia (id_usuario, id_noticia, valoraciones_positivas, valoraciones_negativas, fecha_valoracion)
 VALUE (?, ?, ?, ?, now())`;
  const [create] = await pool.query(insertQuery, [idUser, idNews, valuePositive, valueNegative]);

  return create.insertId;
}

async function findVotesPositiveByIdNews(idNews) {
  const pool = await database.getPool();
  const query = `SELECT COUNT(*) FROM usuario_noticia WHERE id_noticia = ? AND valoraciones_positivas = 1`;
  const [voting] = await pool.query(query, idNews);

  return voting;
}

async function findVotesNegativeByIdNews(idNews) {
  const pool = await database.getPool();
  const query = `SELECT COUNT(*) FROM usuario_noticia WHERE id_noticia = ? AND valoraciones_negativas = 1`;
  const [voting] = await pool.query(query, idNews);

  return voting;
}

module.exports = {
  addVoteByIdUser,
  findVotesPositiveByIdNews,
  findVotesNegativeByIdNews,
};

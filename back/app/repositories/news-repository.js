'use strict';

const getPool = require('../infrastructure/database');

async function findNewsById(newsId) {
  const connection = await getPool();
  const query = `SELECT * FROM noticias
    LEFT JOIN categorias ON categorias.id = noticias.id_categoria
    WHERE noticias.id = ?`;
  const [news] = await connection.query(query, newsId);
  connection.release();
  return news;
}

module.exports = findNewsById;

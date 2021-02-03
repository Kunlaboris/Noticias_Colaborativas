'use strict';

const getPool = require('../infrastructure/database');

async function findNewsById(newsId) {
  const connection = await getPool();
  const query = `SELECT * FROM noticia
    LEFT JOIN categoria ON categoria.id = noticia.id_categoria
    WHERE noticia.id = ?`;
  const [news] = await connection.query(query, newsId);
  connection.release();
  return news;
}

module.exports = findNewsById;

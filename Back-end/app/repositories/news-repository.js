'use strict';

const database = require('../infrastructure/database');

async function findNewsById(newsId) {
  const pool = await database.getPool();
  const query = `SELECT * FROM noticia
    LEFT JOIN categoria ON categoria.id = noticia.id_categoria
    WHERE noticia.id = ?`;
  const [news] = await pool.query(query, newsId);
  return news;
}

module.exports = findNewsById;

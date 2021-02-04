'use strict';

const getPool = require('../infrastructure/database');

async function createNews(subject, category, lead, text, idUser, photo, thumb) {
  const connection = await getPool();
  const query = `
        INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario, foto, miniatura)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  const [news] = await connection.query(query, [subject, category, lead, text, idUser, photo, thumb]);
  connection.release();
  return news;
}

async function getNewById(idNew) {
  const connection = await getPool();
  const query = `SELECT * FROM noticias WHERE id=?`;
  const [news] = await connection.query(query, idNew);
  connection.release();
  return news;
}

async function getNews() {
  const connection = await getPool();
  const query = `SELECT * FROM noticias ORDER BY fecha_publicacion DESC`;
  const [news] = await connection.query(query);

  connection.release();
  return news;
}

async function removeNewById(idNew) {
  const connection = await getPool();
  const query = `DELETE FROM noticias WHERE id=?`;
  const [news] = await connection.query(query, idNew);
  connection.release();
  return news;
}

async function updateNewById(subject, tag, lead, text, idNew) {
  const connection = await getPool();
  const query = `UPDATE noticias SET titulo=?, id_categoria=?, entradilla=?, texto=? WHERE id=?;`;
  const [news] = await connection.query(query, [subject, tag, lead, text, idNew]);
  connection.release();
  return news;
}

async function findNewsById(idNew) {
  const connection = await getPool();
  const query = `SELECT * FROM noticias
    LEFT JOIN categorias ON categorias.id = noticias.id_categoria
    WHERE noticias.id = ?`;
  const [news] = await connection.query(query, idNew);
  connection.release();
  return news;
}

module.exports = {
  createNews,
  getNewById,
  getNews,
  removeNewById,
  updateNewById,
  findNewsById,
};

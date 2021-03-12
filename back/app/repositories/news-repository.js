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
  const query = `SELECT *
  FROM noticias N 
  LEFT JOIN (SELECT id as id_user, nombre, apellido_1, apellido_2, foto as avatar FROM usuarios) U
  ON N.id_usuario = U.id_user
  LEFT JOIN (SELECT id as id_cat, nombre as nombre_categoria FROM categorias) C
  ON N.id_categoria = C.id_cat
  Left join (select id_noticia, sum(valoraciones_positivas) as vpos, sum(valoraciones_negativas) as vneg from valoraciones GROUP BY id_noticia) V
  on V.id_noticia = N.id 
  ORDER BY vpos DESC`;
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

async function updateNewById(subject, category, lead, text, photo, thumb, idNew) {
  const connection = await getPool();
  const query = `UPDATE noticias SET titulo=?, id_categoria=?, entradilla=?, texto=?,foto=?, miniatura=? WHERE id=?;`;
  const [news] = await connection.query(query, [subject, category, lead, text, photo, thumb, idNew]);
  connection.release();
  return news;
}

async function findNewsById(idNew) {
  const connection = await getPool();
  const query = `SELECT * FROM noticias N
    LEFT JOIN (SELECT id as id_cat, nombre as nombre_categoria FROM categorias) C
     ON N.id_categoria = C.id_cat
    WHERE N.id = ?`;
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

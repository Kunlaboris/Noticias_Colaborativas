'use strict';

const getPool = require('../infrastructure/database');

async function addComment(text, idUser, idNews) {
  const connection = await getPool();
  const insertQuery = `INSERT
    INTO comentario (comentario, id_usuario, id_noticia, fecha_comentario)
    VALUES (?, ?, ?, current_timestamp())`;
  const [created] = await connection.query(insertQuery, [text, idUser, idNews]);
  connection.release();
  return created.insertId;
}

async function findCommentByIdNew(idNew) {
  const connection = await getPool();
  const query = `SELECT C.*
  FROM comentarios C  INNER JOIN noticias N
  ON N.id = C.id_noticia WHERE id_noticia = 1 ORDER BY fecha_comentario DESC`;
  const [comments] = await connection.query(query, idNew);
  connection.release();
  return comments;
}

async function findCommentByIdUser(id) {
  const connection = await getPool();
  const query = `SELECT *
  FROM comentarios WHERE id_usuario = ? ORDER BY fecha_comentario DESC`;
  const comments = await connection.query(query, id);
  connection.release();
  return comments;
}

async function deleteCommentById(idComment) {
  const connection = await getPool();
  const query = `DELETE FROM comentarios WHERE id=?`;
  const [category] = await connection.query(query, idComment);
  connection.release();
  return category[0];
}

module.exports = {
  addComment,
  findCommentByIdNew,
  findCommentByIdUser,
  deleteCommentById,
};

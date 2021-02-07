'use strict';

const getPool = require('../infrastructure/database');

async function addComment(comment, idNew, id) {
  const connection = await getPool();
  const insertQuery = `INSERT
    INTO comentarios (comentario, id_noticia, id_usuario)
    VALUES (?, ?, ?)`;
  const [created] = await connection.query(insertQuery, [comment, idNew, id]);
  connection.release();
  return created.insertId;
}

async function findUserComment(idComment) {
  const connection = await getPool();
  const query = 'SELECT id_usuario FROM comentarios WHERE id = ? ';
  const [comments] = await connection.query(query, idComment);
  connection.release();
  return comments[0];
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

async function updateCommentById(comment, idComment) {
  const connection = await getPool();
  const query = 'UPDATE comentarios SET comentario = ? WHERE id = ?';
  const comments = await connection.query(query, [comment, idComment]);
  connection.release();
  return comments;
}

async function deleteCommentById(idComment) {
  const connection = await getPool();
  const query = 'DELETE FROM comentarios WHERE id=?';
  const [category] = await connection.query(query, idComment);
  connection.release();
  return category[0];
}

module.exports = {
  addComment,
  findUserComment,
  findCommentByIdNew,
  findCommentByIdUser,
  deleteCommentById,
  updateCommentById,
};

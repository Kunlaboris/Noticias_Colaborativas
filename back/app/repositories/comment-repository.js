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
  FROM noticias N RIGHT JOIN comentarios C 
  ON N.id = C.id_noticia WHERE id_noticia = ? ORDER BY fecha_comentario DESC;`;
  const [category] = await connection.query(query, idNew);
  connection.release();
  return category[0];
}

//***********************ERRRRRRRRROOOOOOORRRRR */

async function findCommentByIdUser(idUser) {
  const connection = await getPool();
  const query = `SELECT C.*
  FROM comentarios C RIGHT JOIN usuarios U
  ON U.id = C.id_usuario WHERE id_noticia = ? ORDER BY fecha_comentario DESC;`;
  const [category] = await connection.query(query, idUser);
  connection.release();
  return category[0];
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

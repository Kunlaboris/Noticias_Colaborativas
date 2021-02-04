'use strict';

// Para crear una conexion
const getPool = require('../../infrastructure/database');
const { deleteCommentById } = require('../../repositories/comment-repository');

async function removeCommentById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idComment } = req.params;

    await deleteCommentById(idComment);

    res.send({
      status: 'ok',
      message: 'El comentario ha sido eliminada.',
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = removeCommentById;

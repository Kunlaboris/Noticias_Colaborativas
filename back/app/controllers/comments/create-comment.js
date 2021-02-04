'use strict';

const getPool = require('../../infrastructure/database');
const { addComment } = require('../../repositories/comment-repository');

async function createComment(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { text, idUser, idNews } = req.body;

    // Comprobamos que nos llegan todos los campos requeridos.
    if (!text) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    await addComment(text, idUser, idNews);

    res.send({
      status: 'ok',
      message: 'Se ha agregado una nuevo comentario.',
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = createComment;

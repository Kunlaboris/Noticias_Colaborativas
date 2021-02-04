'use strict';

const getPool = require('../../infrastructure/database');

async function createComment(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { text, idNews, idUser } = req.body;

    // Comprobamos que nos llegan todos los campos requeridos.
    if (!text) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    await connection.query(
      `
     INSERT INTO comentarios (comentario, fecha_comentario, id_noticia, id_usuario)
        VALUES (?, current_timestamp(), ?, ?)
      `,
      [text, idNews, idUser]
    );

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

'use strict';

const getPool = require('../../infrastructure/database');

async function createComment(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { text, idUser } = req.body;

    // Comprobamos que nos llegan todos los campos requeridos.
    if (!text) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    await connection.query(
      `
        INSERT INTO comentario (texto, id_usuario)
        VALUES (?, ?)
      `,
      [text, idUser]
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

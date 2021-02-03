'use strict';

// Para crear una conexion
const getPool = require('../../infrastructure/database');

async function removeCommentById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;
    //const { idComment } = req.params;
    await connection.query(`DELETE FROM noticias WHERE id=?;`, [idNew]);
    //await connection.query(`DELETE FROM comentario WHERE id=?;`, [idComment]);

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

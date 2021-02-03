'use strict';

// Para crear una conexion
const getPool = require('../../infraestructure/database');

async function removeNewById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    await connection.query(`DELETE FROM noticias WHERE id=?;`, [idNew]);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido eliminada.',
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = removeNewById;

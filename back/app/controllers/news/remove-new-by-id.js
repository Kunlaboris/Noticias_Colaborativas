'use strict';

// Para crear una conexion
const getPool = require('../../infrastructure/database');
const { removeNewById } = require('../../repositories/news-repository');

async function removeNewsById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    await removeNewById(idNew);

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

module.exports = removeNewsById;

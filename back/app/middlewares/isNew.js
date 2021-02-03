'use strict';

// Para crear una conexion
const getPool = require('../infraestructure/database');

async function isNew(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    const [currentNew] = await connection.query(`SELECT id FROM noticias WHERE id=?;`, [idNew]);

    if (currentNew.length === 0) {
      const error = new Error('La noticia existe.');
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = isNew;

'use strict';

// Para crear una conexion
const getPool = require('../../infraestructure/database');

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(`SELECT * FROM noticias;`);

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getNews;

'use strict';

// Para crear una conexion
const getPool = require('../../infrastructure/database');
const { getNews } = require('../../repositories/news-repository');

async function getNew(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const [result] = await getNews();

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

module.exports = getNew;

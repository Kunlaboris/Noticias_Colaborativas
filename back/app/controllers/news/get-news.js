'use strict';

// Para crear una conexion
const createJsonError = require('../errors/create-json-errors');

const { getNews } = require('../../repositories/news-repository');

async function getNew(req, res, next) {
  try {
    const result = await getNews();

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getNew;

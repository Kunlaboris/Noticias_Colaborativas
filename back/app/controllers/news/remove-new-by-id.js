'use strict';

const createJsonError = require('../errors/create-json-errors');

// Para crear una conexion
const { removeNewById } = require('../../repositories/news-repository');

async function removeNewsById(req, res, next) {
  try {
    const { idNew } = req.params;

    await removeNewById(idNew);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido eliminada.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = removeNewsById;

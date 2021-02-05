'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');

// Para crear una conexion
const { removeNewById } = require('../../repositories/news-repository');

const schema = Joi.number().positive();

async function removeNewsById(req, res, next) {
  try {
    const { idNew } = req.params;

    await schema.validateAsync(idNew);

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

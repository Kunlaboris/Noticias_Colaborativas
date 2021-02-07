'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');
const { addComment } = require('../../repositories/comment-repository');

const schema = Joi.string().min(3).max(140).required();
const schemaIdNews = Joi.number().positive();

async function createComment(req, res, next) {
  try {
    const { comment } = req.body;
    const { id } = req.auth;
    const { idNew } = req.params;

    await schema.validateAsync(comment);
    await schemaIdNews.validateAsync(idNew);
    // Comprobamos que nos llegan todos los campos requeridos.

    if (!comment || !id || !idNew) {
      const error = new Error('Faltan campos.');
      error.status = 400;
      throw error;
    }

    await addComment(comment, idNew, id);

    res.send({
      status: 'ok',
      message: 'Se ha agregado un nuevo comentario.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = createComment;

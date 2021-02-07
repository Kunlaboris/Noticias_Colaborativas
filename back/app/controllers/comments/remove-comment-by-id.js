'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');
const { deleteCommentById } = require('../../repositories/comment-repository');

const schema = Joi.number().positive();

async function removeCommentById(req, res, next) {
  try {
    const { idComment } = req.params;
    await schema.validateAsync(idComment);

    await deleteCommentById(idComment);

    res.send({
      status: 'ok',
      message: 'El comentario ha sido eliminada.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = removeCommentById;

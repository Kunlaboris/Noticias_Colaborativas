'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');
const { updateCommentById, findUserComment } = require('../../repositories/comment-repository');

const schema = Joi.string().min(3).max(140).required();
const schemaIdNews = Joi.number().positive();

async function removeComment(req, res, next) {
  try {
    const { comment } = req.body;
    const { idComment } = req.params;
    const { id } = req.auth;

    await schema.validateAsync(comment);
    await schemaIdNews.validateAsync(idComment);

    const findUser = await findUserComment(parseInt(idComment));

    if (findUser.id_usuario !== parseInt(id)) {
      const error = new Error('Usuario sin autorización.');
      error.status = 400;
      throw error;
    }

    await updateCommentById(comment, idComment);

    res.send({
      status: 'ok',
      message: 'Se ha actualizado un nuevo comentario.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = removeComment;

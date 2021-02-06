'use strict';
const Joi = require('joi');

const createJsonError = require('../errors/create-json-errors');
const { findCommentByIdUser } = require('../../repositories/comment-repository');

const schema = Joi.number().positive();

async function getCommentByIdUser(req, res, next) {
  try {
    const { idUser } = req.params;
    await schema.validateAsync(idUser);
    let id;

    if (idUser) {
      id = idUser;
    } else {
      id = req.auth.id;
    }

    const [result] = await findCommentByIdUser(id);

    res.send({
      status: 'ok',
      data: result[0],
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCommentByIdUser;

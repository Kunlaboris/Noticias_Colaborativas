'use strict';

const Joi = require('joi');

const createJsonError = require('../errors/create-json-errors');
const { findCommentByIdNew } = require('../../repositories/comment-repository');

const schema = Joi.number().positive().required();

async function getCommentByIdNew(req, res, next) {
  try {
    const { idNew } = req.params;
    await schema.validateAsync(idNew);

    const currentNew = await findCommentByIdNew(idNew);

    res.send({
      status: 'ok',
      data: currentNew,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCommentByIdNew;

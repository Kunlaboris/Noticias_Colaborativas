'use strict';

const Joi = require('joi');
const { updateVotingById } = require('../../repositories/voting-repository');
const { findNewsById } = require('../../repositories/news-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.object().keys({
  idNews: Joi.number().positive().required(),
  valuePositive: Joi.number(),
  valueNegative: Joi.number(),
});
const schemaIdVoting = Joi.number().positive().required();

async function updateVoting(req, res) {
  try {
    const { idVoting } = req.params;

    const { idNews, valuePositive, valueNegative } = req.body;
    await schema.validateAsync(req.body);
    await schemaIdVoting.validateAsync(idVoting);

    const existsNews = await findNewsById(idNews);

    if (!existsNews) {
      const error = new Error('The news you want to vote for is not in our database');
      error.status = 409;
      throw error;
    }

    await updateVotingById(valuePositive, valueNegative, idVoting);
    res.status(201).send({
      status: 'ok',
      message: 'The vote has been updated correctly',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateVoting;

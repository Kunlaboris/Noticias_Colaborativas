'use strict';

const Joi = require('joi');
const { addVoteByIdUser, findVotesByIdUser2 } = require('../../repositories/voting-repository');
const { findNewsById } = require('../../repositories/news-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.object().keys({
  idNews: Joi.number().positive().required(),
  valuePositive: Joi.number().min(0).max(1),
  valueNegative: Joi.number().min(0).max(1),
});

async function addVotingByIdUser(req, res) {
  try {
    const { id } = req.auth;

    const { idNews, valuePositive, valueNegative } = req.body;
    await schema.validateAsync(req.body);

    const alreadyVotingUser = await findVotesByIdUser2(id, idNews);
    console.log(alreadyVotingUser[0].count);

    if (parseInt(alreadyVotingUser[0].count) !== 0) {
      const error = new Error('The user has already voted this news');
      error.status = 409;
      throw error;
    }

    const existsNews = await findNewsById(idNews);

    if (!existsNews) {
      const error = new Error('The news you want to vote for is not in our database');
      error.status = 409;
      throw error;
    }

    await addVoteByIdUser(id, idNews, valuePositive, valueNegative);
    res.status(201).send('Your vote has been registered');
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addVotingByIdUser;

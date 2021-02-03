'use strict';

const Joi = require('joi');
const { addVoteByIdUser } = require('../../repositories/voting-repository');
const findNewsById = require('../../repositories/news-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.object().keys({
  idNews: Joi.number().positive().required(),
  valuePositive: Joi.number(),
  valueNegative: Joi.number(),
});

async function addVotingByIdUser(req, res) {
  try {
    // const { id } = req.auth;
    // esto fjkafdk afkkakask
    const id = 1;

    const { idNews, valuePositive, valueNegative } = req.body;
    await schema.validateAsync(req.body);

    console.log(id, idNews, valuePositive, valueNegative);

    const existNews = await findNewsById(idNews);

    if (!existNews) {
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

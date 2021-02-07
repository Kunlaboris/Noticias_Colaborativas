'use strict';

const Joi = require('joi');
const { removeVotingById } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.number().positive().required();

async function deleteVoting(req, res) {
  try {
    const { idVoting } = req.params;

    await schema.validateAsync(idVoting);

    await removeVotingById(idVoting);
    res.status(201).send({
      status: 'ok',
      message: 'The vote has been delete correctly',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteVoting;

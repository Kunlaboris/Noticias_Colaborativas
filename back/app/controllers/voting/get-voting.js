'use strict';

const { findVotes } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

async function getVoting(req, res) {
  try {
    const { idNews } = req.params;
    const votes = await findVotes(idNews);
    return res.send(votes);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVoting;

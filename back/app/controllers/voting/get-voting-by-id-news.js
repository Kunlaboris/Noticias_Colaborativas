'use strict';

const { findVotesByIdNew } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

async function getVotingByIdNews(req, res) {
  try {
    const { idNews } = req.params;
    const votes = await findVotesByIdNew(idNews);
    return res.send(votes);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVotingByIdNews;

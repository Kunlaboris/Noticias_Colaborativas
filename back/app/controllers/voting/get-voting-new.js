'use strict';

const { findVotesNews } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

async function getVotingNews(req, res) {
  try {
    const votes = await findVotesNews();
    res.send(votes);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVotingNews;

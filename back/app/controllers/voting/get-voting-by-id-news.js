'use strict';

const { findVotesByIdUser } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

async function getVotingByIdNews(req, res) {
  try {
    const { idUser, idNews } = req.params;
    const votes = await findVotesByIdUser(idUser, idNews);
    return res.send(votes);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVotingByIdNews;

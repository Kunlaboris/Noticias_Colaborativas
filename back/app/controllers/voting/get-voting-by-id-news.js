'use strict';

const findNewsById = require('../../repositories/news-repository');
const { findVotesPositiveByIdNews, findVotesNegativeByIdNews } = require('../../repositories/voting-repository');
const createJsonError = require('../errors/create-json-errors');

async function getVotingByIdNews(req, res) {
  try {
    const { id_noticia: id, voto: voto } = req.body;
    const existNews = await findNewsById(id);
    if (!existNews) {
      throw new Error('The news you want to access does not exist');
    }
    if (voto === 'positive') {
      const votes = await findVotesPositiveByIdNews(id);
      res.send(votes);
    } else {
      const votes = await findVotesNegativeByIdNews(id);
      res.send(votes);
    }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVotingByIdNews;

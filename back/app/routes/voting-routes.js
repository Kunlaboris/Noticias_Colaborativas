'use strict';

const express = require('express');

const addVoteByIdUser = require('../controllers/voting/add-voting-by-id-user');
const getVotingByIdNews = require('../controllers/voting/get-voting-by-id-news');
const updateVoting = require('../controllers/voting/update-voting-by-id');
const deleteVoting = require('../controllers/voting/delete-voting-by-id');
const { validateAuth, isUser } = require('../middlewares/validate-auth');

const router = express.Router();

//privadas
router
  .get('/', (req, res) => getVotingByIdNews(req, res))
  .post('/', validateAuth, (req, res) => addVoteByIdUser(req, res));

router
  .patch('/:idVoting', validateAuth, (req, res) => updateVoting(req, res))
  .delete('/:idVoting', validateAuth, isUser, (req, res) => deleteVoting(req, res));

module.exports = router;

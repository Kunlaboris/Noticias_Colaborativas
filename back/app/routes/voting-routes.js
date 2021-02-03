'use strict';

const express = require('express');

const addVoteByIdUser = require('../controllers/voting/add-voting-by-id-user');
const getVotingByIdNews = require('../controllers/voting/get-voting-by-id-news');
const updateCategory = require('../controllers/categories/update-category-by-id');
const deleteCategoryById = require('../controllers/categories/delete-category-by-id');

const router = express.Router();

//privadas
router
  .route('/')
  //.all(validateAuth)
  .post((req, res) => addVoteByIdUser(req, res))
  .get((req, res) => getVotingByIdNews(req, res));

router
  .route('/:id')
  // .all(validateAuth)
  //   .get((req, res) => getVotingByIdNews(req, res))
  .patch((req, res) => updateCategory(req, res))
  .delete((req, res) => deleteCategoryById(req, res));

module.exports = router;

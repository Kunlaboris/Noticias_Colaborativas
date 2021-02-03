'use strict';

const express = require('express');
const createCategory = require('../controllers/categories/create-category');
const getCategories = require('../controllers/categories/get-categories');
const getCategoryById = require('../controllers/categories/get-category-by-id');
const updateCategory = require('../controllers/categories/update-category-by-id');
const deleteCategoryById = require('../controllers/categories/delete-category-by-id');

const router = express.Router();

//publicas
router.route('/').get((req, res) => getCategories(req, res));
router.route('/:id').get((req, res) => getCategoryById(req, res));

//privadas
router
  .route('/')
  //.all(validateAuth)
  .post((req, res) => createCategory(req, res));

router
  .route('/:id')
  // .all(validateAuth)
  // .get((req, res) => getCategoryById(req, res))
  .patch((req, res) => updateCategory(req, res))
  .delete((req, res) => deleteCategoryById(req, res));

module.exports = router;

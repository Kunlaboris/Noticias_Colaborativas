'use strict';

const Joi = require('joi');
const { findAllCategories } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');

async function getCategories(req, res) {
  try {
    const categories = await findAllCategories();
    res.status(201).send(categories);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCategories;

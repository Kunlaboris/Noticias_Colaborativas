'use strict';

const Joi = require('joi');
const { createCategory, findByCategory } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.string().min(3).max(100).required();
async function addCategory(req, res) {
  try {
    // if (req.auth.role != 'admin') {
    //   const error = new Error('Only the administrator can create categories on this website');
    //   error.status = 400;
    //   throw error;
    // } else {
    const { name } = req.body;
    await schema.validateAsync(name);
    const existCategory = await findByCategory(name);

    if (existCategory) {
      const error = new Error(`${name} is a category that we already have in our database`);
      error.status = 409;
      throw error;
    }
    const id = await createCategory(name);
    res.status(201).send(`${name} category has been created successfully`);
    // }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addCategory;

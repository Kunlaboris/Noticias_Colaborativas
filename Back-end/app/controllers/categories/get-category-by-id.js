'use strict';

const Joi = require('joi');
const { findCategoryById } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.number().positive().required();

async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);
    const category = await findCategoryById(parseInt(id));

    if (!category) {
      const error = new Error(`According to this ${id} we have not found anything`);
      error.status = 400;
      throw error;
    }

    res.status(201).send(`According to your id, ${category.nombre} is the category searched`);
    // res.status(201).send(nameCategory);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCategoryById;

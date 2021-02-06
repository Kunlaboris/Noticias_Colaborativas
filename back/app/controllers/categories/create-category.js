'use strict';

const Joi = require('joi');
const { createCategory, findByCategory } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');
//esto es un comentario de pueba de git
const schema = Joi.string().min(3).max(100).required();
async function addCategory(req, res) {
  try {
    if (req.auth.rol != 'admin') {
      const error = new Error('Only the administrator can create categories on this website');
      error.status = 400;
      throw error;
    } else {
      const { name } = req.body;
      await schema.validateAsync(name);
      const existCategory = await findByCategory(name);

      if (existCategory) {
        const error = new Error(`${name} is a category that we already have in our database`);
        error.status = 409;
        throw error;
      }
      await createCategory(name);
      res.status(201).send({
        status: 'ok',
        message: `${name} category has been created successfully`,
      });
    }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addCategory;

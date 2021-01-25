'use strict';

const Joi = require('joi');
const { removeCategoryById, findAllCategories, findCategoryById } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');

const schemaId = Joi.number().positive().required();

async function deleteCategoryById(req, res) {
  try {
    // if (req.auth.role != 'admin') {
    //   const error = new Error('Only the administrator can create categories on this website');
    //   error.status = 400;
    //   throw error;
    // } else {
    //Validamos id
    const { id } = req.params;
    await schemaId.validateAsync(id);
    //Validamos el id si existe
    const category = await findCategoryById(parseInt(id));
    if (!category) {
      const error = new Error(`Id: ${id} not available`);
      error.status = 400;
      throw error;
    }
    //Eliminamos
    await removeCategoryById(parseInt(id));

    const categories = await findAllCategories();
    res.status(201).send(categories);
    // }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteCategoryById;

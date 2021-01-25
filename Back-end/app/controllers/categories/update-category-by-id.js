'use strict';

const Joi = require('joi');
const { findByCategory, findCategoryById, updateCategoryById } = require('../../repositories/categories-repository');
const createJsonError = require('../errors/create-json-errors');

const schemaId = Joi.number().positive().required();
const schema = Joi.string().min(3).max(100).required();

async function updateCategory(req, res) {
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

    //Validamos el nombre de la categoría
    const { nombre: name } = req.body;
    console.log(name);
    await schema.validateAsync(name);

    // validamos la categoría si existe
    const existCategory = await findByCategory(name);
    if (existCategory) {
      const error = new Error(`${name} is a category that we already have in our database`);
      error.status = 409;
      throw error;
    }

    //actualizamos y mostramos
    await updateCategoryById(parseInt(id), name);
    res.status(201).send(`${name} category has been updated successfully`);
    // }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateCategory;

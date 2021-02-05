'use strict';

const Joi = require('joi');
//Para crear una conexion
const createJsonError = require('../errors/create-json-errors');

const { getNewById } = require('../../repositories/news-repository');

const schema = Joi.number().positive();

async function getNewsById(req, res, next) {
  try {
    const { idNew } = req.params;

    await schema.validateAsync(idNew);

    const [currentNew] = await getNewById(idNew);

    res.send({
      status: 'ok',
      data: currentNew,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getNewsById;

/* const Joi = require("joi");
const { findById } = require("../repositories/news-repository");

const schema = Joi.number().positive().required();

 */

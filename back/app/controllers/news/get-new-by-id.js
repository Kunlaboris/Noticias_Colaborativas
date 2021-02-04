'use strict';

//Para crear una conexion
const createJsonError = require('../errors/create-json-errors');

const { getNewById } = require('../../repositories/news-repository');

async function getNewsById(req, res, next) {
  try {
    const { idNew } = req.params;

    const [currentNew] = await getNewById(idNew);

    res.send({
      status: 'ok',
      data: currentNew[0],
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

'use strict';

//Para crear una conexion
const getPool = require('../../infrastructure/database');
const { getNewById } = require('../../repositories/news-repository');

async function getNewsById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    const [currentNew] = await getNewById(idNew);

    res.send({
      status: 'ok',
      data: currentNew[0],
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getNewsById;

/* const Joi = require("joi");
const { findById } = require("../repositories/news-repository");

const schema = Joi.number().positive().required();

 */

'use strict';

//Para crear una conexion
const getPool = require('../../infraestructure/database');

async function getNewById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    const [currentNew] = await connection.query(`SELECT * FROM noticias WHERE id=?;`, [idNew]);

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

module.exports = getNewById;

/* const Joi = require("joi");
const { findById } = require("../repositories/news-repository");

const schema = Joi.number().positive().required();

 */

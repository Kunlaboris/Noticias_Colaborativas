'use strict';

//Para crear una conexion
const getPool = require('../../infrastructure/database');
const { findCommentByIdNew } = require('../../repositories/comment-repository');

async function getCommentByIdNew(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;
    //const { idComment } = req.params;

    const [currentNew] = await findCommentByIdNew(idNew);
    //const [currentComment] = await connection.query(`SELECT * FROM comentario WHERE id=?;`, [idComment]);

    res.send({
      status: 'ok',
      data: currentNew[0],
      //data: currentComment[0],
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getCommentByIdNew;

/* const Joi = require("joi");
const { findById } = require("../repositories/news-repository");

const schema = Joi.number().positive().required();

 */

'use strict';

// Para crear una conexion
const getPool = require('../../infrastructure/database');
const { findCommentByIdUser } = require('../../repositories/comment-repository');

async function getCommentByIdUser(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { id } = req.auth;
    const [result] = await findCommentByIdUser(id);

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getCommentByIdUser;

'use strict';

// Para crear una conexion
const getPool = require('../../infraestructure/database');

async function getComment(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    // console.log("HOLAAAAAAAAAAAA");

    const [result] = await connection.query(`SELECT * FROM noticias;`);
    //const [result] = await connection.query(`SELECT * FROM comentario;`);

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

module.exports = getComment;

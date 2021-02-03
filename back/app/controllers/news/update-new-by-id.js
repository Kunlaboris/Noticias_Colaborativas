'use strict';

// Para crear una conexion
const getPool = require('../../infraestructure/database');

async function updateNewById(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { idNew } = req.params;

    let { subject, tag, lead, text } = req.body;

    const [currentNew] = await connection.query(`SELECT * FROM noticias WHERE id=?;`, [idNew]);

    if (!subject) subject = currentNew[0].subject;
    if (!tag) tag = currentNew[0].tag;
    if (!lead) lead = currentNew[0].lead;
    if (!text) text = currentNew[0].text;

    await connection.query(`UPDATE noticias SET titulo=?, id_categoria=?, entradilla=?, texto=? WHERE id=?;`, [
      subject,
      tag,
      lead,
      text,
      idNew,
    ]);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido actualizada.',
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = updateNewById;

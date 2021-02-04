'use strict';

const createJsonError = require('../errors/create-json-errors');

// Para crear una conexion
const { updateNewById } = require('../../repositories/news-repository');

async function updateNewsById(req, res, next) {
  try {
    const { idNew } = req.params;

    let { subject, tag, lead, text } = req.body;

    const [currentNew] = await updateNewById(idNew);

    if (!subject) subject = currentNew[0].subject;
    if (!tag) tag = currentNew[0].tag;
    if (!lead) lead = currentNew[0].lead;
    if (!text) text = currentNew[0].text;

    await updateNewById(subject, tag, lead, text, idNew);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido actualizada.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateNewsById;

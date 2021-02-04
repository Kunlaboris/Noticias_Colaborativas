'use strict';

const createJsonError = require('../errors/create-json-errors');
const { createNews } = require('../../repositories/news-repository');

async function addNews(req, res, next) {
  try {
    const { subject, tag, lead, text, idUser } = req.body;

    // Comprobamos que nos llegan todos los campos requeridos.
    if (!subject || !tag || !lead || !text) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    await createNews(subject, tag, lead, text, idUser);

    //esto es una prueba si github esta funcionando

    res.send({
      status: 'ok',
      message: 'Se ha agregado una nueva noticia.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addNews;

'use strict';

const createJsonError = require('../errors/create-json-errors');
const { createNews } = require('../../repositories/news-repository');
const { uploadImage } = require('../../../helpers');

async function addNews(req, res, next) {
  try {
    const { subject, category, lead, text } = req.body;
    const { id } = req.auth;

    // Comprobamos que nos llegan todos los campos requeridos.
    // TODO: validar con Joi
    if (!subject || !category || !lead || !text) {
      const error = new Error('Faltan campos.');
      error.httpStatus = 400;
      throw error;
    }

    // Comprobamos si se subió una foto
    let newPhoto;
    let newThumbnail;

    if (req.files && req.files.foto) {
      //Procesamos la foto y generamos las dos versiones
      newPhoto = await uploadImage({
        imageData: req.files.foto.data,
        directory: process.env.PATH_NEWS_IMAGE,
        width: 800,
      });

      newThumbnail = await uploadImage({
        imageData: req.files.foto.data,
        directory: process.env.PATH_NEWS_IMAGE,
        width: 300,
        height: 300,
      });
    }

    await createNews(subject, category, lead, text, id, newPhoto, newThumbnail);

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

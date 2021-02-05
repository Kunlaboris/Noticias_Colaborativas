'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');
const { createNews } = require('../../repositories/news-repository');
const { uploadImage } = require('../../../helpers');

const schema = Joi.object().keys({
  subject: Joi.string().min(12).max(50).required(),
  category: Joi.number().min(1).max(10).required(),
  lead: Joi.string().min(10).max(300).required(),
  text: Joi.string().min(300).max(1000).required(),
});

async function addNews(req, res, next) {
  try {
    await schema.validateAsync(req.body);

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

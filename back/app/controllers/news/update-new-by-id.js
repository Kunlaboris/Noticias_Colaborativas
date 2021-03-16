'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');

// Para crear una conexion
const { updateNewById, findNewsById } = require('../../repositories/news-repository');
const { uploadImage } = require('../../../helpers');

const schema = Joi.object().keys({
  subject: Joi.string().min(12).max(200),
  foto: Joi.any().allow(null, ''),
  category: Joi.number().min(1).max(10).error(new Error(' La categoria es incorecta')),
  lead: Joi.string().min(10).max(255),
  text: Joi.string().min(300).max(1000),
});

async function updateNewsById(req, res, next) {
  try {
    await schema.validateAsync(req.body);

    const { idNew } = req.params;
    console.log(idNew);

    let { subject, category, lead, text } = req.body;

    const currentNew = await findNewsById(idNew);
    // Comprobamos si se subió una foto
    let newPhoto = currentNew[0].foto;
    let newThumbnail = currentNew[0].miniatura;

    if (req.files && req.files.foto) {
      //Procesamos la foto y generamos las dos versiones
      newPhoto = await uploadImage({
        imageData: req.files.foto.data,
        directory: process.env.PATH_NEWS_IMAGE,
        width: 480,
      });

      newThumbnail = await uploadImage({
        imageData: req.files.foto.data,
        directory: process.env.PATH_NEWS_IMAGE,
        width: 177,
        height: 200,
      });
    }

    if (!subject) subject = currentNew[0].titulo;
    if (!category) category = currentNew[0].id_categoria;
    if (!lead) lead = currentNew[0].entradilla;
    if (!text) text = currentNew[0].texto;

    await updateNewById(subject, category, lead, text, newPhoto, newThumbnail, idNew);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido actualizada.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateNewsById;

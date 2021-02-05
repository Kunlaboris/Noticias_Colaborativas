'use strict';

const Joi = require('joi');
const createJsonError = require('../errors/create-json-errors');

// Para crear una conexion
const { updateNewById } = require('../../repositories/news-repository');

const schema = Joi.object().keys({
  subject: Joi.string().min(12).max(50).required(),
  category: Joi.number().min(1).max(10).required(),
  lead: Joi.string().min(10).max(300).required(),
  text: Joi.string().min(300).max(1000).required(),
});

async function updateNewsById(req, res, next) {
  try {
    await schema.validateAsync(req.body);

    const { idNew } = req.params;

    let { subject, category, lead, text } = req.body;

    const currentNew = await updateNewById(idNew);

    if (!subject) subject = currentNew[0].subject;
    if (!category) category = currentNew[0].category;
    if (!lead) lead = currentNew[0].lead;
    if (!text) text = currentNew[0].text;

    await updateNewById(subject, category, lead, text, idNew);

    res.send({
      status: 'ok',
      message: 'La noticia ha sido actualizada.',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateNewsById;

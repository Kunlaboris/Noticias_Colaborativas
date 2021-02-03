'use strict';

const Joi = require('joi');
const { removeUserById, findUserById } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    if (req.auth.rol !== 'admin') {
      const error = new Error('No tienes permiso para realizar esta acción');
      error.status = 403;
      throw error;
    }

    const { id } = req.params;

    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      const error = new Error('Este usuario no existe');
      error.status = 400;
      throw error;
    }

    if (user.rol === 'admin') {
      const error = new Error('No se puede borrar un usuario administrador');
      error.status = 403;
      throw error;
    }

    await removeUserById(id);

    res.send({
      message: 'usuario borrado',
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;

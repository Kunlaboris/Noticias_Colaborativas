'use strict';

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, findUserByNickname } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.object().keys({
  firstname: Joi.string().min(3).max(40).required(),
  lastname: Joi.string().min(3).max(40).required(),
  surname: Joi.string().min(3).max(40),
  nickname: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  birthDate: Joi.date().less('now'),
  password: Joi.string().min(4).max(100).required(),
  repeatPassword: Joi.ref('password'),
  biography: Joi.string().max(250),
});

async function registerUsers(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { firstname, lastname, surname, nickname, email, birthDate, password, repeatPassword, biography } = req.body;

    const existUser = await findUserByEmail(email);
    const existNickname = await findUserByNickname(nickname);

    //si ese email existe, devuelve un error
    if (existUser || existNickname) {
      const error = new Error('Ya existe un usuario con este email o nickname');
      error.status = 409;
      throw error;
      // el status code 409 significa que hay un conflicto, pero con 400 tampoco pasa nada
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // llamada a la base de datos

    const id = await createUser(
      firstname,
      lastname,
      surname,
      nickname,
      email,
      birthDate,
      passwordHash,
      biography,
      'reader'
    );

    res.status(201).send({ id, firstname, lastname, surname, nickname, birthDate, biography, email });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUsers;

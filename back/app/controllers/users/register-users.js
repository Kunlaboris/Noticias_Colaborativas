"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const {
  addVerificationCode,
  createUser,
  findUserByEmail,
  findUserByNickname,
} = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");
const { sendEmailRegistration } = require("../../../mail-smtp");

const schema = Joi.object().keys({
  firstname: Joi.string().min(3).max(40).required(),
  lastname: Joi.string().min(3).max(40).required(),
  surname: Joi.string().allow(null, ""),
  nickname: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  birthDate: Joi.date().less("now"),
  password: Joi.string().min(4).max(100).required(),
  repeatPassword: Joi.ref("password"),
  biography: Joi.string().max(250),
});

async function registerUsers(req, res) {
  try {
    await schema.validateAsync(req.body);

    const {
      firstname,
      lastname,
      surname,
      nickname,
      email,
      birthDate,
      password,
      repeatPassword,
      biography,
    } = req.body;

    const existUser = await findUserByEmail(email);
    const existNickname = await findUserByNickname(nickname);

    //si ese email existe, devuelve un error
    if (existUser || existNickname) {
      const error = new Error("Ya existe un usuario con este email o nickname");
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
      "reader"
    );
    //////////////////////////////////////////////////////////////////////

    // COMPROBAR DESDE AQUÍ

    // nada más se crea el usuario, se crea el código de verificación -verificationCode
    // lo enviamos por email - sendEmailRegistration
    // se añade a la base de datos en la nueva tabla creada usuario_activacion - addVerificationCode

    const verificationCode = cryptoRandomString({ length: 64 });
    await sendEmailRegistration(nickname, email, verificationCode);
    await addVerificationCode(id, verificationCode);

    /////////////////////////////////////////////////////////////////////////

    res.status(201).send({
      id,
      firstname,
      lastname,
      surname,
      nickname,
      birthDate,
      biography,
      email,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUsers;

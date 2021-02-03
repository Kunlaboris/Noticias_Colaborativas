"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const {
  findUserByEmail,
  updateUserById,
  findUserById,
  addVerificationCode,
  deleteOldVerificationCode,
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

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(100).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUser(req, res) {
  try {
    const { id } = req.auth;

    await schema.validateAsync(req.body);
    const { nickname, email, password, repeatPassword } = req.body;

    const userById = await findUserById(id);
    const user = await findUserByEmail(email);

    if (user && user.id !== id) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    let updatedPassword = userById.password;
    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);

      updatedPassword = passwordHash;
    }

    if (email !== userById.email) {
      const verificationCode = cryptoRandomString({ length: 64 });
      await sendEmailRegistration(nickname, email, verificationCode);
      await deleteOldVerificationCode(id);
      await addVerificationCode(id, verificationCode);
    }

    await udpateUserById({ id, nickname, email, password: updatedPassword });

    res.send({ id, nickname, email, role: userById.role });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateUser;

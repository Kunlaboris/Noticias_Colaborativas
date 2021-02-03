'use strict';

const Joi = require('joi');
const { validateActivation } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.string().min(64).max(64).required();

async function activateUser(req, res) {
  try {
    const { verification_code: verificationCode } = req.query;

    if (!verificationCode) {
      const error = new Error('Invalid verification code');
      error.status(400);
      throw error;
    }
    await schema.validateAsync(verificationCode);

    const isActivated = await validateActivation(verificationCode);
    if (!isActivated) {
      res.send('Account not activated. Verification code expired.');
    } else {
      res.send('Account activate');
    }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = activateUser;

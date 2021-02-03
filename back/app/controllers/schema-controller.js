'use strict';

// SCHEMA DE CONTROLADOR VACIO

const Joi = require('joi');
const { registerUsers } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().password().min(4).max(20).required(),
    repeatPassword: Joi.ref('password'),
});

async function registerUsers(req, res) {
    try {

    } catch(err) {
        createJsonError(err, res);
    }

}

module.exports = registerUsers;
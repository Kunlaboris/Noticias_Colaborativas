'use strict';

const { findAllUsers } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

async function getUser(req, res) {
  try {
    const user = await findAllUsers();

    return res.send(user);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUser;

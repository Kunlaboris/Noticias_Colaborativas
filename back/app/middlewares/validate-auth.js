'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    // validamos el id, si no hay autorizazion o la autorizacion no empieza con Bearer, se genera un error
    // Validamos que viene en el header y empieza por Bearer, si no es así, se genera un error
    // El Bearer vienen por que postman simula que viene de un servidor

    if (!authorization || !authorization.startsWith('Bearer')) {
      const error = new Error('Authorization required');
      error.status = 403;
      throw error;
    }
    // se separa la cadena donde hay un espacio y coge el primer elemento donde hay nuestro token
    const accessToken = authorization.split(' ')[1];

    // Esto leerá el payload del todo
    const payload = jwt.verify(accessToken, JWT_SECRET);

    const { id, nickname, rol } = payload;
    req.auth = { id, nickname, rol };

    next();
  } catch (err) {
    res.status(401);
    res.send({ error: err.message });
  }
}

function isUser(req, res, next) {
  if (!req.auth) {
    res.status(403);
    res.send({ error: 'Autorización requerida' });
  } else {
    next();
  }
}

module.exports = { validateAuth, isUser };

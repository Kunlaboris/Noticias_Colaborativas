'use strict';

const { findUserById } = require('../../repositories/users-repository');
const createJsonError = require('../errors/create-json-errors');

async function getUserProfile(req, res) {
  try {
    let userId;
    let userRol;

    if (req.auth) {
      userId = req.auth.id;
      userRol = req.auth.rol;
    }

    const { id } = req.params;

    const user = await findUserById(id);

    let userInfo = {
      id: user.id,
      nombre: user.nombre,
      nickname: user.nickname,
      biografia: user.biografia,
      foto: user.foto,
    };

    //Si el usuario que pedimos es el nuestro o el token es de admin mostrarmos toda la info
    if (parseInt(id) === userId || userRol === 'admin') {
      delete user.contrasena;

      return res.send({
        user,
      });
    }
    //Si no tenemos token mandar info básica
    return res.send({
      user: userInfo,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserProfile;

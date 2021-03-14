'use strict';

const createJsonError = require('../errors/create-json-errors');

const { findUserById, uploadUserProfileImage } = require('../../repositories/users-repository');

const { uploadImage, deleteImage } = require('../../../helpers');

async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;

    if (!req.files || !req.files.avatar) {
      const error = new Error('No se ha cargado ninguna imagen');
      error.status = 400;
      throw error;
    }

    const avatar = req.files.avatar;
    if (!avatar.mimetype.startsWith('image')) {
      const error = new Error('El fichero subido no es una imagen');
      error.status = 400;
      throw error;
    }

    //Procesamos la imagen y conseguimos el nombre de fichero
    const avatarFileName = await uploadImage({
      imageData: avatar.data,
      directory: process.env.PATH_USER_IMAGE,
      width: 300,
      height: 300,
    });

    // si el usuario tiene una imagen previamente la borramos
    const user = await findUserById(id);

    // Borramos la imagen original
    if (user.foto) {
      await deleteImage({
        directory: process.env.PATH_USER_IMAGE,
        fileName: user.foto,
      });
    }

    // Actualiza el usuario en la base de datos con la nueva foto
    await uploadUserProfileImage(id, avatarFileName);

    // devolvemos una respuesta
    res.send({
      status: 'ok',
      message: 'Avatar actualizado',
      avatar: avatarFileName,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = uploadImageProfile;

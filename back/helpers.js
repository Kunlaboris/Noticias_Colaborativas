const path = require('path');
const uuid = require('uuid');
const sharp = require('sharp');
const { ensureDir, unlink } = require('fs-extra');

async function uploadImage({ imageData, directory, width, height }) {
  const uploadDirectory = path.join(__dirname, directory);

  // Nos aseguramos que el directorio destination existe y si no lo creamos
  await ensureDir(uploadDirectory);

  // Leemos la imagen
  const image = sharp(imageData);

  // Cambiamos el tamaño a la imagen
  image.resize(width, height);
  // Generamos un nombre aleatorio para el fichero resultante
  const imageName = uuid.v4() + '.jpg';

  // Guardamos la imagen el directorio destination con el nombre anteiror
  await image.toFile(path.join(uploadDirectory, imageName));

  // Devolvemos el nombre del fichero
  return imageName;
}

async function deleteImage({ directory, fileName }) {
  const imagePath = path.join(__dirname, directory, fileName);

  await unlink(imagePath);

  return true;
}

module.exports = {
  uploadImage,
  deleteImage,
};

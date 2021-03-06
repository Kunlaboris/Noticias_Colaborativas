'use strict';

const getPool = require('../infrastructure/database');

/////////////////////////////////////////////////////////////////////////////////

// PARA EL EMAIL DE VERIFICACION/ PODRÍA IR EN UN FICHERO SEPARADO???? O EN VALIUDATE AUTH

async function addVerificationCode(userId, code) {
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' '); //////?????????????????

  // hacemos el INSERT
  const data = {
    user_id: userId,
    verification_code: code,
    created_at: createdAt,
  };
  const connection = await getPool();
  const insertQuery = 'INSERT INTO usuario_activacion SET ?';

  //METODO INSERT QUERY + ARRAY/objeto -> sobre todo para arrays muy grandes

  const [created] = await connection.query(insertQuery, data);
  connection.release();
  return created.insertId;
}

async function validateActivation(code) {
  const now = new Date();
  const verifiedAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const connection = await getPool();
  const updateQuery =
    'UPDATE usuario_activacion SET verified_at = ? WHERE verification_code = ? AND verified_at IS NULL';
  const [validation] = await connection.query(updateQuery, [verifiedAt, code]);

  if (validation.affectedRows === 1) {
    return true;
  }

  connection.release();
  return false;
}

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

//PARA EL UPDATE DE USUARIO

async function deleteOldVerificationCode(id) {
  const connection = await getPool();
  const deleteQuery = 'DELETE FROM usuario_activacion WHERE user_id = ?';

  await connection.query(deleteQuery, id);

  connection.release();

  return true;
}

async function updateUserById(data) {
  const { firstname, lastname, surname, nickname, email, birthDate, password, biography, id } = data;
  const connection = await getPool();
  const updateQuery =
    'UPDATE usuarios SET nombre = ?, apellido_1 = ?, apellido_2 = ?, nickname = ?, email = ?, fecha_nacimiento=?, contrasena = ?, biografia=? WHERE id = ?';
  await connection.query(updateQuery, [
    firstname,
    lastname,
    surname,
    nickname,
    email,
    birthDate,
    password,
    biography,
    id,
  ]);

  connection.release();
  return true;
}

//////////////////////////////////////////////////////////

async function findAllUsers() {
  const connection = await getPool();
  const query = 'SELECT id, nombre, apellido_1, apellido_2, biografia, foto FROM usuarios ORDER BY fecha_creacion DESC';
  const [users] = await connection.query(query);
  connection.release();
  return users;
}

async function findUserByEmail(email) {
  // llamada DB, el FALSE significa que no lo ha encontrado
  const connection = await getPool();
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  //HAY QUE ADAPTAR LA CONSULTA A LAS COLUMNAS DE LA BASE DE DATOS
  const [user] = await connection.query(query, email);

  connection.release();
  return user[0];
}

async function findUserByNickname(nickname) {
  const connection = await getPool();
  const query = 'SELECT * FROM usuarios WHERE nickname = ?';
  const [user] = await connection.query(query, nickname);
  return user[0];
}
async function createUser(firstname, lastname, surname, nickname, email, birthDate, passwordHash, biography, rol) {
  //llamar base de datos, el pool abre la conexion con la base de datos
  const connection = await getPool();
  //HAY QUE ADAPTAR LA CONSULTA A LA BASE DE DATOS
  const insertQuery =
    'INSERT INTO usuarios (nombre, apellido_1, apellido_2, nickname, email, fecha_nacimiento, contrasena, biografia, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [created] = await connection.query(insertQuery, [
    firstname,
    lastname,
    surname,
    nickname,
    email,
    birthDate,
    passwordHash,
    biography,
    rol,
  ]);

  connection.release();
  return created.insertId;
}

async function findUserById(id) {
  const connection = await getPool();
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  const [users] = await connection.query(query, id);

  connection.release();
  return users[0];
}

// FALTA VERIFICAR SI ES CORRECTA O SI FALTA ALGO MÁS - COMO SE BORRA LO DE LAS OTRAS TABLAS

async function removeUserById(id) {
  const connection = await getPool();
  const query = 'DELETE FROM usuarios WHERE id = ?';
  await connection.query(query, id);
  connection.release();
  return true;
}

async function uploadUserProfileImage(id, image) {
  const connection = await getPool();
  const updateQuery = 'UPDATE usuarios SET foto = ? WHERE id =?';
  await connection.query(updateQuery, [image, id]);

  connection.release();
  return true;
}

module.exports = {
  addVerificationCode,
  validateActivation,
  updateUserById,
  deleteOldVerificationCode,
  createUser,
  removeUserById,
  findAllUsers,
  findUserByEmail,
  findUserByNickname,
  findUserById,
  uploadUserProfileImage,
};

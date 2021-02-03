"use strict";

const database = require("../infrastructure/database");

/////////////////////////////////////////////////////////////////////////////////

// PARA EL EMAIL DE VERIFICACION/ PODRÍA IR EN UN FICHERO SEPARADO???? O EN VALIUDATE AUTH

async function addVerificationCode(userId, code) {
  const now = newDate();
  const createdAt = now.toISOString().substring(0, 19).replace("T", " "); //////?????????????????

  // hacemos el INSERT
  const data = {
    user_id: userId,
    verification_code: code,
    created_at: createdAt,
  };
  const pool = await database.getPool();
  const insertQuery = "INSERT INTO usuario_activacion SET ?";

  //METODO INSERT QUERY + ARRAY/objeto -> sobre todo para arrays muy grandes

  const [created] = await pool.query(insertQuery, data);
  return created.insertId;
}

async function validateActivation(code) {
  const now = newDate();
  const verifiedAt = now.toISOString().substring(0, 19).replace("T", " ");
  const pool = await database.getPool();
  const updateQuery =
    "UPDATE usuario_activacion SET verified_at = ? WHERE verification_code = ? AND verified_at IS NULL";
  const [validation] = await pool.query(updateQuery, [verifiedAt, code]);

  if (validation.affectedRows === 1) {
    return true;
  }
  return false;
}

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

//PARA EL UPDATE DE USUARIO

async function deleteOldVerificationCode(id) {
  const pool = await database.getPool();
  const deleteQuery = "DELETE FROM usuario_activacion WHERE user_id = ?";

  await pool.query(deleteQuery, id);

  return true;
}

async function updateUserById(data) {
  const {
    firstname,
    lastname,
    surname,
    nickname,
    email,
    birthDate,
    passwordHash,
    biography,
  } = data;
  const pool = await database.getPool();
  const updateQuery = `UPDATE usuario
  SET nombre = ?, apellido_1 = ?, apellido_2 = ?, nickname = ?, email = ?, fecha_nacimiento=?, contrasena = ?, biografia=? WHERE id=?
  WHERE id = ?`;
  await pool.query(updateQuery, [
    firstname,
    lastname,
    surname,
    nickname,
    email,
    birthDate,
    passwordHash,
    biography,
  ]);

  return true;
}

//////////////////////////////////////////////////////////

async function findAllUsers() {
  //llamar base de datos
  return "getUsers";
}

async function findUserByEmail(email) {
  // llamada DB, el FALSE significa que no lo ha encontrado
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE email = ?";
  //HAY QUE ADAPTAR LA CONSULTA A LAS COLUMNAS DE LA BASE DE DATOS
  const [user] = await pool.query(query, email);
  return user[0];
}

async function findUserByNickname(nickname) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE nickname = ?";
  const [user] = await pool.query(query, nickname);
  return user[0];
}
async function createUser(
  firstname,
  lastname,
  surname,
  nickname,
  email,
  birthDate,
  passwordHash,
  biography,
  rol
) {
  //llamar base de datos, el pool abre la conexion con la base de datos
  const pool = await database.getPool();
  //HAY QUE ADAPTAR LA CONSULTA A LA BASE DE DATOS
  const insertQuery =
    "INSERT INTO usuario (nombre, apellido_1, apellido_2, nickname, email, fecha_nacimiento, contrasena, biografia, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
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
  return created.insertId;
}

async function findUserById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE id = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}

// FALTA VERIFICAR SI ES CORRECTA O SI FALTA ALGO MÁS - COMO SE BORRA LO DE LAS OTRAS TABLAS

async function removeUserById(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM usuario WHERE id = ?";
  await pool.query(query, id);

  return true;
}

async function uploadUserProfileImage(id, image) {
  const pool = await database.getPool();
  const updateQuery = "UPDATE usuario SET foto = ? WHERE id =?";
  await pool.query(updateQuery, [image, id]);

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

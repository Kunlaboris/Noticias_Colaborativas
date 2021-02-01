'use strict';

const database = require('../infrastructure/database');


async function findAllUsers () {
    //llamar base de datos
    return 'getUsers';
}

async function findUserByEmail(email) {
    // llamada DB, el FALSE significa que no lo ha encontrado
    const pool = await database.getPool();
    const query = 'SELECT * FROM usuario WHERE email = ?';
    //HAY QUE ADAPTAR LA CONSULTA A LAS COLUMNAS DE LA BASE DE DATOS
    const [user] = await pool.query(query, email);
    return user[0];
}

async function findUserByNickname(nickname) {
    const pool = await database.getPool();
    const query = 'SELECT * FROM usuario WHERE nickname = ?';
    const [user] = await pool.query(query, nickname);
    return user[0];
}
async function createUser(firstname, lastname, surname, nickname, email, birthDate, passwordHash, biography, rol) {
    //llamar base de datos, el pool abre la conexion con la base de datos
    const pool = await database.getPool();
    //HAY QUE ADAPTAR LA CONSULTA A LA BASE DE DATOS
    const insertQuery= `INSERT
    INTO usuario (nombre, apellido_1, apellido_2, nickname, email, fecha_nacimiento, contrasena, biografia, rol, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [created] = await pool.query(insertQuery, [firstname, lastname, surname, nickname, email, birthDate, passwordHash, biography, rol]);
    return created.insertId;
}


//************************************************************************************** */

async function findUserProfileImage(id) {
  const pool = await database.getPool();
  const query = 'SELECT image FROM users WHERE id = ?';
  const [users] = await pool.query(query, id);

  return users[0];
}

async function uploadUserProfileImage(id, image) {
  const pool = await database.getPool();
  const updateQuery = 'UPDATE users SET image = ? WHERE id = ?';
  await pool.query(updateQuery, [image, id]);

  return true;
}


module.exports = {
    findAllUsers,
    findUserByEmail,
    findUserByNickname,
    createUser,
    findUserProfileImage
    uploadUserProfileImage
}


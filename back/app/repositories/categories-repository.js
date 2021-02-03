'use strict';

const getPool = require('../infrastructure/database');

async function createCategory(name) {
  const connection = await getPool();
  const insertQuery = 'INSERT INTO categoria (nombre) VALUES (?)';
  const [created] = await connection.query(insertQuery, [name]);
  connection.release();
  return created.insertId;
}

async function findByCategory(name) {
  const connection = await getPool();
  const query = 'SELECT * FROM categoria WHERE nombre = ?';
  const [category] = await connection.query(query, [name]);
  connection.release();
  return category[0];
}

async function findAllCategories() {
  const connection = await getPool();
  const query = 'SELECT * FROM categoria';
  const [category] = await connection.query(query);
  connection.release();

  return category;
}

async function findCategoryById(id) {
  const connection = await getPool();
  const query = 'SELECT * FROM categoria WHERE id = ?';
  const [category] = await connection.query(query, id);
  connection.release();

  return category[0];
}

async function updateCategoryById(id, name) {
  const connection = await getPool();
  const updateQuery = 'UPDATE categoria SET nombre = ? WHERE id = ?';
  await connection.query(updateQuery, [name, id]);
  connection.release();

  return true;
}

async function removeCategoryById(id) {
  const connection = await getPool();
  const deleteQuery = 'DELETE FROM categoria WHERE id = ?';
  await connection.query(deleteQuery, id);
  connection.release();

  return true;
}

module.exports = {
  createCategory,
  findByCategory,
  findAllCategories,
  findCategoryById,
  removeCategoryById,
  updateCategoryById,
};

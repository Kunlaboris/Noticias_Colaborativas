'use strict';

const { query } = require('express');
const database = require('../infrastructure/database');

async function createCategory(name) {
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO categoria (nombre) VALUES (?)';
  const [created] = await pool.query(insertQuery, [name]);
  return created.insertId;
}

async function findByCategory(name) {
  const pool = await database.getPool();
  const query = 'SELECT * FROM categoria WHERE nombre = ?';
  const [category] = await pool.query(query, [name]);
  return category[0];
}

async function findAllCategories() {
  const pool = await database.getPool();
  const query = 'SELECT * FROM categoria';
  const [category] = await pool.query(query);
  return category;
}

async function findCategoryById(id) {
  const pool = await database.getPool();
  const query = 'SELECT * FROM categoria WHERE id = ?';
  const [category] = await pool.query(query, id);
  return category[0];
}

async function updateCategoryById(id, name) {
  const pool = await database.getPool();
  const updateQuery = 'UPDATE categoria SET nombre = ? WHERE id = ?';
  await pool.query(updateQuery, [name, id]);
  return true;
}

async function removeCategoryById(id) {
  const pool = await database.getPool();
  const deleteQuery = 'DELETE FROM categoria WHERE id = ?';
  await pool.query(deleteQuery, id);
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

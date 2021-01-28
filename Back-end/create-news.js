'use strict';

const express = require('express');
const router = express.Router();
const createJsonError = require('./app/controllers/errors/create-json-errors');
const database = require('./app/infrastructure/database')

//publicas
router.route('/').post((req, res) => addNews(req, res));


async function addNews(req, res) {
  try {
    const { name } = req.body;
    
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO noticias (titulo, foto, entradilla, texto, id_usuario) VALUES (?)';
  await pool.query(insertQuery, [name]);

    res.status(201).send();
    
  } catch (err) {
    createJsonError(err, res);
  }
}
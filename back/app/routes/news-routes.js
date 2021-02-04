'use strict';

const express = require('express');
const newsControllers = require('../controllers/news');
const isNew = require('../middlewares/isNew');
const { validateAuth, isUser } = require('../middlewares/validate-auth');

const router = express.Router();

//publicas

// Listar todas las noticias.
// Crear noticia
router
  .get('/', (req, res) => newsControllers.getNews(req, res))
  .post('/', validateAuth, isUser, (req, res) => newsControllers.createNew(req, res));

// Obtener una noticia concreta.
// Editar una noticia
// Borrar una noticia
router
  .get('/:idNew', isNew, (req, res) => newsControllers.getNewById(req, res))
  .patch('/:idNew', isNew, validateAuth, isUser, (req, res) => newsControllers.updateNewById(req, res))
  .delete('/:idNew', isNew, validateAuth, isUser, (req, res) => newsControllers.removeNewById(req, res));

module.exports = router;

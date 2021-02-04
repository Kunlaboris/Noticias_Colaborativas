'use strict';

const express = require('express');
const newsControllers = require('../controllers/news');
const isNew = require('../middlewares/isNew');
const { validateAuth, isUser } = require('../middlewares/validate-auth');

const router = express.Router();

// Listar todos los comentario de un evento concreto.
router
  .get('/api/v1/news/:idNew/comments', (req, res) => newsControllers.getNews(req, res))
  // TODO: Crear un comentario.
  .post('/api/v1/news/:idNew/comment', isNew, validateAuth, isUser, (req, res) => newsControllers.getNews(req, res));

// TODO: Editar un comentario.
// app.put('/api/v1/news/:idNew/comments/:idComment');

// TODO: Eliminar un comentario.
// app.delete('/api/v1/news/:idNew/comments/:idComment');

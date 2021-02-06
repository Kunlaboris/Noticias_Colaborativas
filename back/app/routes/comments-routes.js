'use strict';

const express = require('express');
const getCommentByIdNew = require('../controllers/comments/get-comment-by-id-new');
const getCommentByIdUser = require('../controllers/comments/get-comments-by-id-user');
const isNew = require('../middlewares/isNew');
const { validateAuth, isUser } = require('../middlewares/validate-auth');

const router = express.Router();

// Listar todos los comentario de un evento concreto.
router
  .get('/news/:idNew/comments', (req, res) => getCommentByIdNew(req, res))
  //Listar todos los comentarios del usuario activo
  .get('/user/comments', validateAuth, (req, res) => getCommentByIdUser(req, res))
  //Listar todos los comentarios del usuario
  .get('/user/:idUser/comments', (req, res) => getCommentByIdUser(req, res))
  // TODO: Crear un comentario.
  .post('/:idNew/comment', isNew, validateAuth, isUser, (req, res) => getCommentByIdUser(req, res));

// TODO: Editar un comentario.
// app.put('/api/v1/news/:idNew/comments/:idComment');

// TODO: Eliminar un comentario.
// app.delete('/api/v1/news/:idNew/comments/:idComment');

module.exports = router;

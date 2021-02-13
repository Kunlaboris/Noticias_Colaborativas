'use strict';

const express = require('express');
const getCommentByIdNew = require('../controllers/comments/get-comment-by-id-new');
const getCommentByIdUser = require('../controllers/comments/get-comment-by-id-user');
const createComment = require('../controllers/comments/create-comment');
const updateComment = require('../controllers/comments/update-comment');
const removeComment = require('../controllers/comments/remove-comment-by-id');

// const isNew = require('../middlewares/isNew');
const { validateAuth, isUser } = require('../middlewares/validate-auth');

const router = express.Router();

// Listar todos los comentario de un evento concreto.
router
  .get('/news/:idNew/comments', (req, res) => getCommentByIdNew(req, res))
  //Listar todos los comentarios del usuario activo
  .get('/user/comments', validateAuth, (req, res) => getCommentByIdUser(req, res))
  //Listar todos los comentarios del usuario
  .get('/user/:idUser/comments', (req, res) => getCommentByIdUser(req, res))
  // Crear un comentario.
  .post('/news/:idNew/comments', validateAuth, isUser, (req, res) => createComment(req, res))
  //Editar un comentario.
  .put('/news/:idNew/comments/:idComment', validateAuth, isUser, (req, res) => updateComment(req, res))
  .delete('/news/:idNew/comments/:idComment', validateAuth, isUser, (req, res) => removeComment(req, res));

module.exports = router;

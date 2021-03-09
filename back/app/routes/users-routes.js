'use strict';

const express = require('express');

///////COMPROBAR ESTA con su ruta de abajo
const activateUser = require('../controllers/users/activate-user');
//////////////////////

const { validateAuth, isUser } = require('../middlewares/validate-auth');

const registerUsers = require('../controllers/users/register-users');
const loginUser = require('../controllers/users/login-user');

const deleteUserById = require('../controllers/users/delete-user-by-id');

const uploadImageProfile = require('../controllers/users/upload-image-profile');
const getUserProfile = require('../controllers/users/get-user-profile');
const getUser = require('../controllers/users/get-user');
const updateUser = require('../controllers/users/update-user');

const router = express.Router();

//PUBLICAS

//api/v1/users

router.route('/register').post((req, res) => registerUsers(req, res));
router.route('/login').post((req, res) => loginUser(req, res));
router.route('/activation').get((req, res) => activateUser(req, res));

router.route('/').get((req, res) => getUser(req, res));

//PRIVADAS

//api/v1/users/:id
router
  .route('/:id')
  .all(validateAuth, isUser)
  .delete((req, res) => deleteUserById(req, res))
  .put((req, res) => updateUser(req, res));

// UPLOAD IMAGE PROFILE

router
  .route('/upload')
  .all(validateAuth, isUser)
  .put((req, res) => uploadImageProfile(req, res));

// PROFILE
router
  .route('/:id/profile')
  .all(validateAuth)
  .get((req, res) => getUserProfile(req, res));

module.exports = router;

"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(60).required(),
});

async function loginUser(req, res) {
  try {
    //validar el ID, no hace falta
    //validar que el email existe no existe
    // el siguiente paso, validar el body

    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    // hay que validar que el EMAIL SÍ QUE EXISTE
    // 401 es un error de registro forbidden

    const user = await findUserByEmail(email);
    if (!user) {
      const error = new Error("No existe un usuario con este email");
      error.code = 401;
      throw error;
    }

    // console.log(user);
    // hay que validar el PASSWORD
    const isValidPassword = await bcrypt.compare(password, user.contrasena);
    if (!isValidPassword) {
      const error = new Error("Email o password no válido");
      error.code = 401;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id, nickname, rol } = user;
    const jwtTokenExpiration = "10d";
    const payload = { id, nickname, rol };
    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };
    res.send(response);

    // para generar un token se hace un jwt.sign - esto mete el payload dentro del token
    // payload es el contenido que queremos meter en nuestro token , lee el payload del token
    // Secret es lo que tenemos en el .env
    // El paylopad no va en login ya que solo generamos token, no lo modificamos

    /* const token = jwt.sign(payload, secret);
        const payload = jwt.verify(token, secret); */
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = loginUser;

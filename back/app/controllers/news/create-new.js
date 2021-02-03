"use strict";

const getPool = require("../../infraestructure/database");

async function createNew(req, res, next) {
  let connection;

  try {
    connection = await getPool();

    const { subject, tag, lead, text, idUser } = req.body;

    // Comprobamos que nos llegan todos los campos requeridos.
    if (!subject || !tag || !lead || !text) {
      const error = new Error("Faltan campos.");
      error.httpStatus = 400;
      throw error;
    }

    await connection.query(
      `
        INSERT INTO noticias (titulo, id_categoria, entradilla, texto, id_usuario)
        VALUES (?, ?, ?, ?, ?)
      `,
      [subject, tag, lead, text, idUser]
    );

    //esto es una prueba si github esta funcionando

    res.send({
      status: "ok",
      message: "Se ha agregado una nueva noticia.",
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = createNew;

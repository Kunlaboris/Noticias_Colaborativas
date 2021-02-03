'use strict';

// este fichero funciona en otros de node que pueda hacer, igual, siempre que el nombre de la base de datos, user y pass sean los correctos. 

const mysql = require('mysql2/promise');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD
} = process.env;

// necesitamos meter todas estas variables en nuestro fichero .env

let pool;

// todo lo que tenga que ver con la base de datos es asincrono
//una manera de crear una conexion más rápida
// createPool lo gestiona el solo todo, se crea un acceso imediato y mientras este activo funciona el solo
// es un sistema mas eficiente que connection/disconnection

async function getPool() {
    if(!pool) {
        pool = await mysql.createPool({
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            database: DATABASE_NAME,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD
        });
    }
    return pool;
}

module.exports = { getPool};
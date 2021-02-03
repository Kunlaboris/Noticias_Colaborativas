'use strict';

const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      connectionLimit: 10,
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
}

module.exports = getPool;

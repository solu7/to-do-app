const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(() => console.log("Conectado a la base de datos MySQL"))
  .catch(err => console.error("Error al conectar a la base de datos:", err));

module.exports = pool;
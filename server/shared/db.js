import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then(() => console.log("Conectado a la base de datos MySQL"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

export default pool;
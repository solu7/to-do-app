import pool from "../shared/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows;
}

export async function createUser(email, hashedPassword) {
  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );
  return result;
}

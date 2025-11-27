import { nanoid } from "nanoid";
import pool from "../shared/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows;
}

export async function findUserByUsername(username) {
  const [rows] = await pool.query("SELECT * FROM users WHERE username =?", [
    username,
  ]);
  return rows;
}

export async function updateUsername(userId, newUsername) {
  const [result] = await pool.query(
    "UPDATE users SET username = ? WHERE id = ?",
    [newUsername, userId]
  );
  return result.affectedRows === 1;
}

export async function createUser(username, email, hashedPassword) {
  const id = nanoid(10);
  const [result] = await pool.query(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
    [id, username, email, hashedPassword]
  );
  return result;
}

export const findUserById = async (userId) => {
  const [result] = await pool.query(
    "SELECT id, username, email FROM users WHERE id = ?",
    [userId]
  );
  return result[0];
};

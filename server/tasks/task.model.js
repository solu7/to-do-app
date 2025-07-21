import pool from "../shared/db.js";

export const getLatestTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
    [userId]
  );
  return tasks;
};

export const createTask = async (userId, title, description, category) => {
  await pool.query(
    "INSERT INTO tasks (user_id, title, description, category) VALUES (?, ?, ?, ?)",
    [userId, title, description, category]
  );
};

export const updateTask = async (taskId, userId, fields, values) => {
  const sql = `UPDATE tasks SET ${fields.join(
    ", "
  )} WHERE id = ? AND user_id = ?`;
  values.push(taskId, userId);
  return pool.query(sql, values);
};

export const findTaskById = async (taskId, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return rows;
};

export const deleteTask = async (taskId, userId) => {
  const [result] = await pool.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return result;
};


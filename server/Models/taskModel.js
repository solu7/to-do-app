const pool = require("../db");

// Listar tareas por usuario
const getTasksByUser = async (userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

// Crear tarea
const createTask = async (userId, title, description, category, tags) => {
  await pool.query(
    "INSERT INTO tasks (user_id, title, description, category, tags) VALUES (?, ?, ?, ?, ?)",
    [userId, title, description, category, tags]
  );
};

// Actualizar tarea
const updateTask = async (taskId, userId, fields, values) => {
  const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`;
  values.push(taskId, userId);
  return pool.query(sql, values);
};

// Buscar tarea por ID y usuario
const findTaskById = async (taskId, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return rows;
};

// Eliminar tarea
const deleteTask = async (taskId, userId) => {
  const [result] = await pool.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return result;
};

module.exports = {
  getTasksByUser,
  createTask,
  updateTask,
  findTaskById,
  deleteTask,
};
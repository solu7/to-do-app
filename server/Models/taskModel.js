const pool = require("../db");

// Últimas 10 tareas
const getLatestTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
    [userId]
  );
  return tasks;
};

// Filtrar por categoría
const getTasksByCategory = async (userId, category) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? AND category = ? ORDER BY created_at DESC",
    [userId, category]
  );
  return tasks;
};

// Filtrar por tag 
const getTasksByTag = async (userId, tag) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? AND tags LIKE ? ORDER BY created_at DESC",
    [userId, `%${tag}%`]
  );
  return tasks;
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
  const sql = `UPDATE tasks SET ${fields.join(
    ", "
  )} WHERE id = ? AND user_id = ?`;
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
  getLatestTasks,
  getTasksByCategory,
  getTasksByTag,
  createTask,
  updateTask,
  findTaskById,
  deleteTask,
};
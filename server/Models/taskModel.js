const pool = require("../db");

// Últimas 10 tareas
const getLatestTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
    [userId]
  );
  return tasks;
};

const assignTagToTask = async (userId, taskId, tagId) => {

  const [task] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (task.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada");
  }

  const [tag] = await pool.query(
    "SELECT * FROM tags WHERE id = ? AND user_id = ?",
    [tagId, userId]
  );
  if (tag.length === 0) {
    throw new Error("Tag no encontrado o no autorizado");
  }

  await pool.query(
    `INSERT IGNORE INTO task_tags (task_id, tag_id)
     VALUES (?, ?)`,
    [taskId, tagId]
  );
};

const removeTagFromTask = async (userId, taskId, tagId) => {
  // Verificar que la tarea sea del usuario
  const [task] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (task.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada");
  }

  // Verificar que el tag sea del usuario
  const [tag] = await pool.query(
    "SELECT * FROM tags WHERE id = ? AND user_id = ?",
    [tagId, userId]
  );
  if (tag.length === 0) {
    throw new Error("Tag no encontrado o no autorizado");
  }

  // Eliminar la relación
  const [result] = await pool.query(
    "DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?",
    [taskId, tagId]
  );

  if (result.affectedRows === 0) {
    throw new Error("El tag no estaba asignado a esta tarea");
  }
};

// Filtrar por categoría
const getTasksByCategory = async (userId, category) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? AND category = ? ORDER BY created_at DESC",
    [userId, category]
  );
  return tasks;
};

// Crear tarea
const createTask = async (userId, title, description, category) => {
  await pool.query(
    "INSERT INTO tasks (user_id, title, description, category, tags) VALUES (?, ?, ?, ?, ?)",
    [userId, title, description, category]
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
  createTask,
  updateTask,
  findTaskById,
  deleteTask,
  assignTagToTask,
  removeTagFromTask,
};
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

const assignCategoriesToTask = async (userId, taskId, categoryIds) => {
  // Verificar que la tarea sea del usuario
  const [task] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (task.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada");
  }

  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    throw new Error("No se proporcionaron categorías");
  }

  // Verificar que todas las categorías sean del usuario en una sola consulta
  const [categories] = await pool.query(
    `SELECT id FROM categories WHERE id IN (${categoryIds.map(() => '?').join(',')}) AND user_id = ?`,
    [...categoryIds, userId]
  );
  const validCategoryIds = categories.map(cat => cat.id);

  // Verificar si hay alguna categoría no autorizada
  const unauthorized = categoryIds.filter(id => !validCategoryIds.includes(id));
  if (unauthorized.length > 0) {
    throw new Error(`Categoría(s) no autorizada(s): ${unauthorized.join(', ')}`);
  }

  // Preparar valores para inserción múltiple
  const values = validCategoryIds.map(categoryId => [taskId, categoryId]);
  if (values.length > 0) {
    await pool.query(
      `INSERT IGNORE INTO task_categories (task_id, category_id) VALUES ${values.map(() => '(?, ?)').join(', ')}`,
      values.flat()
    );
  }
};

const removeCategoryFromTask = async (userId, taskId, categoryId) => {
  // Verifica que la tarea pertenezca al usuario
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (tasks.length === 0) {
    return { notFound: true };
  }

  // Elimina la relación entre la tarea y la categoría
  await pool.query(
    "DELETE FROM task_categories WHERE task_id = ? AND category_id = ?",
    [taskId, categoryId]
  );

  return { notFound: false };
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
    "INSERT INTO tasks (user_id, title, description, category) VALUES (?, ?, ?, ?)",
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
  assignCategoriesToTask,
  removeCategoryFromTask,
};

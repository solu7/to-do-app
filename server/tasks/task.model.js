import pool from "../shared/db.js";

export const getAllTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return tasks;
};

export const getInboxTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? AND completed = 0 ORDER BY created_at ASC LIMIT 10",
    [userId]
  );
  return tasks;
};

export const getCompletedTasks = async (userId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE user_id = ? AND completed = 1 ORDER BY created_at DESC",
    [userId]
  );
  return tasks;
};

export const getFilteredTasks = async (userId, filters = {}) => {
  let query = `
        SELECT 
            t.*, 
            GROUP_CONCAT(DISTINCT tc.category_id) AS category_ids,
            GROUP_CONCAT(DISTINCT tt.tag_id) AS tag_ids
        FROM tasks t
        LEFT JOIN task_categories tc ON t.id = tc.task_id
        LEFT JOIN task_tags tt ON t.id = tt.task_id
        WHERE t.user_id = ?
    `;
  const params = [userId];
  let havingConditions = [];

  if (filters.priority !== undefined) {
    query += " AND t.priority = ?";
    params.push(filters.priority);
  }

  if (filters.isCompleted !== undefined) {
    const completedValue = filters.isCompleted ? 1 : 0;
    query += " AND t.completed = ?";
    params.push(completedValue);
  }

  if (filters.categoryId !== undefined) {
    havingConditions.push(
      `FIND_IN_SET(?, GROUP_CONCAT(DISTINCT tc.category_id))`
    );
    params.push(filters.categoryId);
  }

  if (filters.tagId !== undefined) {
    havingConditions.push(`FIND_IN_SET(?, GROUP_CONCAT(DISTINCT tt.tag_id))`);
    params.push(filters.tagId);
  }

  query += " GROUP BY t.id";

  if (havingConditions.length > 0) {
    query += " HAVING " + havingConditions.join(" AND ");
  }

  query += " ORDER BY t.created_at DESC";

  try {
    const [tasks] = await pool.query(query, params);
    return tasks;
  } catch (error) {
    console.error("Error al obtener tareas filtradas:", error);
    throw error;
  }
};

export const createTask = async (userId, title, description) => {
  const [result] = await pool.query(
    `INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)`,
    [userId, title, description]
  );
  const [newTask] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
    result.insertId,
  ]);
  return newTask[0];
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

export const getTaskCompletionStatus = async (taskId, userId, column) => {
  const [tasks] = await pool.query(
    `SELECT ${column} FROM tasks WHERE id = ? AND user_id = ?`,
    [taskId, userId]
  );
  return tasks.length > 0 ? tasks[0][column] : null;
};

export const toggleTaskCompletion = async (taskId, userId, completedStatus) => {
  const [result] = await pool.query(
    `
    UPDATE tasks
    SET completed = ?
    WHERE id = ? AND user_id = ?
    `,
    [completedStatus, taskId, userId]
  );
  if (result.affectedRows === 0) {
    throw new Error("Tarea no encontrada o no autorizada para el usuario.");
  }
};

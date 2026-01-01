import pool from "../shared/db.js";
import {
  defaultCategories,
  defaultTags,
  defaultTasks,
} from "../shared/defaultData.js";

const TASK_QUERY_BASE = `
  SELECT 
    t.*, 
    GROUP_CONCAT(DISTINCT c.name) AS category_names,
    GROUP_CONCAT(DISTINCT c.id) AS category_ids,
    GROUP_CONCAT(DISTINCT tg.name) AS tag_names,
    GROUP_CONCAT(DISTINCT tg.id) AS tag_ids
  FROM tasks t
  LEFT JOIN task_categories tc ON t.id = tc.task_id
  LEFT JOIN categories c ON tc.category_id = c.id
  LEFT JOIN task_tags tt ON t.id = tt.task_id
  LEFT JOIN tags tg ON tt.tag_id = tg.id
`;

/*
 * CRUD principal de las tareas
 */
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

export const getAllTasks = async (userId) => {
  const query = `${TASK_QUERY_BASE} WHERE t.user_id = ? GROUP BY t.id ORDER BY t.created_at DESC`;
  const [tasks] = await pool.query(query, [userId]);
  return tasks;
};

export const updateTask = async (taskId, userId, fields, values) => {
  const sql = `UPDATE tasks SET ${fields.join(
    ", "
  )} WHERE id = ? AND user_id = ?`;
  values.push(taskId, userId);
  return pool.query(sql, values);
};

export const deleteTask = async (taskId, userId) => {
  const [result] = await pool.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return result;
};

/*
 * Obtener tareas FILTRADAS
 */
export const findTaskById = async (taskId, userId) => {
  const query = `${TASK_QUERY_BASE} WHERE t.id = ? AND t.user_id = ? GROUP BY t.id`;
  const [rows] = await pool.query(query, [taskId, userId]);
  return rows;
};

export const getInboxTasks = async (userId) => {
  const query = `${TASK_QUERY_BASE} 
    WHERE t.user_id = ? AND t.completed = 0 
    GROUP BY t.id 
    ORDER BY t.created_at DESC 
    LIMIT 10`;
  const [tasks] = await pool.query(query, [userId]);
  return tasks;
};

export const getTasksByDateRange = async (userId, startOfDay, endOfDay) => {
  const query = `${TASK_QUERY_BASE} 
    WHERE t.user_id = ? AND t.due_date >= ? AND t.due_date <= ? AND t.completed = 0
    GROUP BY t.id
    ORDER BY t.priority DESC, t.created_at ASC`;
  const [rows] = await pool.query(query, [userId, startOfDay, endOfDay]);
  return rows;
};

export const getCompletedTasks = async (userId) => {
  const query = `${TASK_QUERY_BASE} 
    WHERE t.user_id = ? AND t.completed = 1 
    GROUP BY t.id 
    ORDER BY t.created_at DESC`;
  const [tasks] = await pool.query(query, [userId]);
  return tasks;
};

export const getFilteredTasks = async (userId, filters = {}) => {
  let query = `
        SELECT 
            t.*, 
            GROUP_CONCAT(DISTINCT c.name) AS category_names,
            GROUP_CONCAT(DISTINCT c.id) AS category_ids,
            GROUP_CONCAT(DISTINCT tg.name) AS tag_names,
            GROUP_CONCAT(DISTINCT tg.id) AS tag_ids
        FROM tasks t
        LEFT JOIN task_categories tc ON t.id = tc.task_id
        LEFT JOIN categories c ON tc.category_id = c.id
        LEFT JOIN task_tags tt ON t.id = tt.task_id
        LEFT JOIN tags tg ON tt.tag_id = tg.id
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

/*
 * ESTO DE COMPLETADO en las tareas
 */
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

/*
 * FECHAS en las tareas
 */
export const getTaskDueDate = async (userId, taskId) => {
  const [rows] = await pool.query(
    "SELECT due_date FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );

  if (rows.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
  return rows[0].due_date;
};

export const setTaskDueDate = async (userId, taskId, date) => {
  const [result] = await pool.query(
    "UPDATE tasks SET due_date = ? WHERE id = ? AND user_id = ?",
    [date, taskId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
  return result;
};

export const removeTaskDueDate = async (userId, taskId) => {
  const [result] = await pool.query(
    "UPDATE tasks SET due_date = NULL WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
  return result;
};

/*
 * CARGA LAS TAREAS, TAGS Y CATEGORIAS POR DEFECTO
 */
export async function initializeUserData(userId) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const categoryMap = {};
    const tagMap = {};

    for (const cat of defaultCategories) {
      const [result] = await connection.query(
        `INSERT INTO categories (user_id, name) VALUES (?, ?)`,
        [userId, cat.name]
      );
      categoryMap[cat.name] = result.insertId;
    }

    for (const tag of defaultTags) {
      const [result] = await connection.query(
        `INSERT INTO tags (user_id, name) VALUES (?, ?)`,
        [userId, tag.name]
      );
      tagMap[tag.name] = result.insertId;
    }

    for (const task of defaultTasks) {
      const categoryId = categoryMap[task.categoryName];

      const [taskResult] = await connection.query(
        `INSERT INTO tasks (user_id, title, description, priority) VALUES (?, ?, ?, ?)`,
        [userId, task.title, task.description, task.priority]
      );
      const taskId = taskResult.insertId;

      if (categoryId) {
        await connection.query(
          `INSERT IGNORE INTO task_categories (task_id, category_id) VALUES (?, ?)`,
          [taskId, categoryId]
        );
      }

      for (const tagName of task.tagNames) {
        const tagId = tagMap[tagName];
        if (tagId) {
          await connection.query(
            `INSERT IGNORE INTO task_tags (task_id, tag_id) VALUES (?, ?)`,
            [taskId, tagId]
          );
        }
      }
    }

    await connection.commit();
    console.log(`Datos iniciales cargados para el usuario: ${userId}`);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(
      `Error al inicializar datos para el usuario ${userId}:`,
      error
    );
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

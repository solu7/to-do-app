import pool from "../shared/db.js";

export const setTaskPriority = async (userId, taskId, priority) => {
  if (priority !== null && (priority < 1 || priority > 4)) {
    throw new Error("La prioridad debe ser entre 1 y 4.");
  }

  const [result] = await pool.query(
    "UPDATE tasks SET priority = ? WHERE id = ? AND user_id = ?",
    [priority, taskId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
};

export const getTaskPriority = async (userId, taskId) => {
  try {
    const [rows] = await pool.query(
      "SELECT priority FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );
    if (rows.length === 0) {
      throw new Error("Tarea no encontrada o no autorizada.");
    }
    return rows[0].priority;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskPriority = async (userId, taskId) => {
  const [result] = await pool.query(
    "UPDATE tasks SET priority = NULL WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
};

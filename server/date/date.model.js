import pool from "../shared/db.js";

export const setTaskDate = async (userId, taskId, date) => {
  const [task] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (task.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }

  const [existingDate] = await pool.query(
    "SELECT * FROM task_date WHERE task_id = ?",
    [taskId]
  );
  if (existingDate.length > 0) {
    await pool.query(
      "UPDATE task_date SET date = ? WHERE task_id = ?",
      [date, taskId]
    );
  } else {
    await pool.query(
      "INSERT INTO task_date (task_id, date) VALUES (?, ?)",
      [taskId, date]
    );
  }
};

export const getTaskDate = async (userId, taskId) => {
  const [task] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );

  if (task.length === 0) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }

  const [date] = await pool.query(
    "SELECT date FROM task_date WHERE task_id = ?",
    [taskId]
  );

  return date || null;
};
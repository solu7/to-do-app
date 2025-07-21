import pool from "../shared/db.js";

export const createTag = async (userId, name) => {
  const [result] = await pool.query(
    `INSERT INTO tags (user_id, name)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = name`,
    [userId, name]
  );

  if (result.insertId) {
    const [tag] = await pool.query("SELECT * FROM tags WHERE id = ?", [
      result.insertId,
    ]);
    return tag[0];
  } else {
    const [tag] = await pool.query(
      "SELECT * FROM tags WHERE user_id = ? AND name = ?",
      [userId, name]
    );
    return tag[0];
  }
};

export const assignTagToTask = async (userId, taskId, tagId) => {
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

export const removeTagFromTask = async (userId, taskId, tagId) => {
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

  const [result] = await pool.query(
    "DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?",
    [taskId, tagId]
  );

  if (result.affectedRows === 0) {
    throw new Error("El tag no estaba asignado a esta tarea");
  }
};

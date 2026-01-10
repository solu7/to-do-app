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

export const deleteTag = async (userId, tagId) => {
  const [result] = await pool.query(
    "DELETE FROM tags WHERE id = ? AND user_id = ?",
    [tagId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Tag not found or not authorized to delete");
  }
  return result;
};

export const getTagsByUserId = async (userId) => {
  const [tags] = await pool.query("SELECT * FROM tags WHERE user_id = ?", [
    userId,
  ]);
  return tags;
};

export const getTagsInTask = async (userId, taskId) => {
  const [tags] = await pool.query(
    "SELECT t.* FROM tags t JOIN task_tags tt ON t.id = tt.tag_id WHERE tt.task_id = ? AND t.user_id = ?",
    [taskId, userId]
  );
  return tags;
};

export const assignTagToTask = async (userId, taskId, tagId) => {
  const [validationResult] = await pool.query(
    `
      SELECT
        (SELECT 1 FROM tasks WHERE id = ? AND user_id = ?) AS taskExists,
        (SELECT 1 FROM tags WHERE id = ? AND user_id = ?) AS tagExists
    `,
    [taskId, userId, tagId, userId]
  );
  const { taskExists, tagExists } = validationResult[0];

  if (!taskExists) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
  if (!tagExists) {
    throw new Error("Tag no encontrado o no autorizado.");
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
    throw new Error("Task not found or not authorized");
  }

  const [tag] = await pool.query(
    "SELECT * FROM tags WHERE id = ? AND user_id = ?",
    [tagId, userId]
  );
  if (tag.length === 0) {
    throw new Error("Tag not found or not authorized");
  }

  const [result] = await pool.query(
    "DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?",
    [taskId, tagId]
  );

  if (result.affectedRows === 0) {
    throw new Error("The tag was not assigned to this task");
  }
};

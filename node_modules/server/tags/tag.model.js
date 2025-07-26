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
    throw new Error("Task not found or not authorized");
  }

  const [tag] = await pool.query(
    "SELECT * FROM tags WHERE id = ? AND user_id = ?",
    [tagId, userId]
  );
  if (tag.length === 0) {
    throw new Error("Tag not found or not authorized");
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

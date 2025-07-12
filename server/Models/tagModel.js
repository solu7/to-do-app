const pool = require("../db");

const createTag = async (userId, name) => {
  const [result] = await pool.query(
    `INSERT INTO tags (user_id, name)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = name`,
    [userId, name]
  );

  if (result.insertId) {
    const [tag] = await pool.query("SELECT * FROM tags WHERE id = ?", [result.insertId]);
    return tag[0];
  } else {
    const [tag] = await pool.query("SELECT * FROM tags WHERE user_id = ? AND name = ?", [userId, name]);
    return tag[0];
  }
};

const getTasksByTagName = async (userId, tagName) => {
  const [tasks] = await pool.query(
    `SELECT t.*
     FROM tasks t
     JOIN task_tags tt ON t.id = tt.task_id
     JOIN tags g ON g.id = tt.tag_id
     WHERE t.user_id = ? AND g.name = ?
     ORDER BY t.created_at DESC`,
    [userId, tagName]
  );
  return tasks;
}

module.exports = {
  getTasksByTagName,
  createTag,
};
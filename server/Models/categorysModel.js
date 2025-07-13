const pool = require("../db");

const createCategory = async (userId, name) => {
  const [result] = await pool.query(
    `INSERT INTO categories (user_id, name)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = name`,
    [userId, name]
  );

  if (result.insertId) {
    const [category] = await pool.query("SELECT * FROM categories WHERE id = ?", [result.insertId]);
    return category[0];
  } else {
    const [category] = await pool.query("SELECT * FROM categories WHERE user_id = ? AND name = ?", [userId, name]);
    return category[0];
  }
};

module.exports = {
  createCategory,
};
const pool = require("../shared/db");

const createCategory = async (userId, name) => {
  const [result] = await pool.query(
    `INSERT INTO categories (user_id, name)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = name`,
    [userId, name]
  );

  if (result.insertId) {
    const [category] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [result.insertId]
    );
    return category[0];
  } else {
    const [category] = await pool.query(
      "SELECT * FROM categories WHERE user_id = ? AND name = ?",
      [userId, name]
    );
    return category[0];
  }
};

const assignCategoriesToTask = async (userId, taskId, categoryIds) => {
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

  const [categories] = await pool.query(
    `SELECT id FROM categories WHERE id IN (${categoryIds
      .map(() => "?")
      .join(",")}) AND user_id = ?`,
    [...categoryIds, userId]
  );
  const validCategoryIds = categories.map((cat) => cat.id);

  const unauthorized = categoryIds.filter(
    (id) => !validCategoryIds.includes(id)
  );
  if (unauthorized.length > 0) {
    throw new Error(
      `Categoría(s) no autorizada(s): ${unauthorized.join(", ")}`
    );
  }

  const values = validCategoryIds.map((categoryId) => [taskId, categoryId]);
  if (values.length > 0) {
    await pool.query(
      `INSERT IGNORE INTO task_categories (task_id, category_id) VALUES ${values
        .map(() => "(?, ?)")
        .join(", ")}`,
      values.flat()
    );
  }
};

const removeCategoryFromTask = async (userId, taskId, categoryId) => {
  const [tasks] = await pool.query(
    "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  if (tasks.length === 0) {
    return { notFound: true };
  }

  await pool.query(
    "DELETE FROM task_categories WHERE task_id = ? AND category_id = ?",
    [taskId, categoryId]
  );

  return { notFound: false };
};

const getTasksByCategory = async (category) => {
  const [tasks] = await pool.query(
    "SELECT * FROM task_categories WHERE category_id = ?",
    [category]
  );
  return tasks;
};

module.exports = {
  createCategory,
  assignCategoriesToTask,
  removeCategoryFromTask,
  getTasksByCategory,
};

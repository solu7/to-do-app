import pool from "../shared/db.js";

export const createCategory = async (userId, name) => {
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

export const deleteCategory = async (userId, categoryId) => {
  const [result] = await pool.query(
    "DELETE FROM categories WHERE id = ? AND user_id = ?",
    [categoryId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error("Category not found or not authorized to delete");
  }
  return result;
};

export const getCategoriesInTask = async (userId, taskId) => {
  const [categories] = await pool.query(
    "SELECT c.* FROM categories c JOIN task_categories tc ON c.id = tc.category_id WHERE tc.task_id = ? AND c.user_id = ?",
    [taskId, userId]
  );
  return categories;
};

export const assignCategoryToTask = async (userId, taskId, categoryId) => {
  const [validationResult] = await pool.query(
    `
      SELECT
        (SELECT 1 FROM tasks WHERE id = ? AND user_id = ?) AS taskExists,
        (SELECT 1 FROM categories WHERE id = ? AND user_id = ?) AS categoryExists
    `,
    [taskId, userId, categoryId, userId]
  );
  const { taskExists, categoryExists } = validationResult[0];

  if (!taskExists) {
    throw new Error("Tarea no encontrada o no autorizada.");
  }
  if (!categoryExists) {
    throw new Error("Categoría no encontrada o no autorizada.");
  }
  await pool.query(
    `INSERT IGNORE INTO task_categories (task_id, category_id)
      VALUES (?, ?)`,
    [taskId, categoryId]
  );
};

export const removeCategoryFromTask = async (userId, taskId, categoryId) => {
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

export const getAllCategories = async (userId) => {
  const [categories] = await pool.query(
    "SELECT * FROM categories WHERE user_id = ?",
    [userId]
  );
  return categories;
};

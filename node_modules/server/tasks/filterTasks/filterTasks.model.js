import pool from "../../shared/db.js";

export const getFilteredTasks = async (userId, tagIds = [], categoryIds = []) => {
  let query = `
    SELECT DISTINCT t.*
    FROM tasks t
    LEFT JOIN task_tags tt ON t.id = tt.task_id
    LEFT JOIN tags tg ON tg.id = tt.tag_id
    LEFT JOIN task_categories tc ON t.id = tc.task_id
    WHERE t.user_id = ?
  `;

  const params = [userId];

  if (tagIds.length > 0) {
    query += ` AND tg.id IN (${tagIds.map(() => "?").join(",")})`;
    params.push(...tagIds);
  }

  if (categoryIds.length > 0) {
    query += ` AND tc.category_id IN (${categoryIds.map(() => "?").join(",")})`;
    params.push(...categoryIds);
  }

  query += " ORDER BY t.created_at DESC";

  const [tasks] = await pool.query(query, params);
  return tasks;
};
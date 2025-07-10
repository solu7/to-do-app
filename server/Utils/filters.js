function buildTaskFilterQuery(filters) {
  let filterClause = "";
  const values = [];

  if (filters.category) {
    filterClause += " AND category = ?";
    values.push(filters.category);
  }

  if (filters.tags) {
    filterClause += " AND tags LIKE ?";
    values.push(`%${filters.tags}%`);
  }

  return { filterClause, values };
}

module.exports = { buildTaskFilterQuery };

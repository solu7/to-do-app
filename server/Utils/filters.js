function buildTaskFilterQuery(filters) {
  let filterClause = "";
  const values = [];

  if (filters.category) {
    filterClause += " AND category = ?";
    values.push(filters.category);
  }

  return { filterClause, values };
}

module.exports = { buildTaskFilterQuery };

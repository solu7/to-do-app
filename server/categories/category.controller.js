import {
  createCategory as _createCategory,
  assignCategoriesToTask as _assignCategoriesToTask,
  removeCategoryFromTask as _removeCategoryFromTask,
} from "./category.model.js";

export const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "The category name is required" });
  }

  try {
    const category = await _createCategory(userId, name.trim());
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignCategoriesToTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { categoryIds } = req.body;

  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return res
      .status(400)
      .json({ message: "The categoryID must be an array." });
  }

  try {
    await _assignCategoriesToTask(userId, taskId, categoryIds);
    res
      .status(200)
      .json({ message: "Categories correctly assigned to the task" });
  } catch (error) {
    console.error("Error assigning categories to task:", error);
    res.status(400).json({ message: error.message });
  }
};

export const removeCategoryFromTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId, categoryId } = req.params;

  try {
    const result = await _removeCategoryFromTask(userId, taskId, categoryId);
    if (result.notFound) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Category removed from task" });
  } catch (error) {
    console.error("Error removing category from task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

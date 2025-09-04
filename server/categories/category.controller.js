import {
  createCategory as _createCategory,
  assignCategoryToTask as _assignCategoryToTask,
  removeCategoryFromTask as _removeCategoryFromTask,
  getAllCategories as _getAllCategories,
  getCategoriesInTask as _getCategoriesInTask,
} from "./category.model.js";

export const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio" });
  }

  try {
    const category = await _createCategory(userId, name.trim());
    res.status(201).json(category);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getCategoriesInTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;

  try {
    const categoriesInTask = await _getCategoriesInTask(userId, taskId);
    res.status(200).json(categoriesInTask);
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const assignCategoryToTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { categoryId } = req.body;

  if (!categoryId) {
    return res
      .status(400)
      .json({ message: "El ID de la categoría es obligatorio" });
  }

  try {
    await _assignCategoryToTask(userId, taskId, categoryId);
    res
      .status(200)
      .json({ message: "Categoría asignada correctamente a la tarea" });
  } catch (error) {
    console.error("Error al asignar categoría a la tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

export const removeCategoryFromTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId, categoryId } = req.params;

  try {
    const result = await _removeCategoryFromTask(userId, taskId, categoryId);
    if (result.notFound) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Categoría eliminada de la tarea" });
  } catch (error) {
    console.error("Error al quitar la categoría de la tarea:", error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  const userId = req.user.id;
  try {
    const categories = await _getAllCategories(userId);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error al obtener categorias del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

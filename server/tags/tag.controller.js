import {
  createTag as _createTag,
  assignTagToTask as _assignTagToTask,
  removeTagFromTask as _removeTagFromTask,
  getTagsInTask as _getTagsInTask,
} from "./tag.model.js";

export const createTag = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "El nombre del tag es obligatorio" });
  }

  try {
    const tag = await _createTag(userId, name.trim());
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error al crear el tag:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getTagsInTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;

  try {
    const tagsInTask = await _getTagsInTask(userId, taskId);
    res.status(200).json(tagsInTask);
  } catch (error) {
    console.error("Error al obtener los tags:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const assignTagToTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const { tagId } = req.body;

  if (!tagId) {
    return res.status(400).json({ message: "El ID del tag es obligatorio" });
  }

  try {
    await _assignTagToTask(userId, taskId, tagId);
    res.status(200).json({ message: "Tag asignado correctamente a la tarea" });
  } catch (error) {
    console.error("Error al asignar tag a tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

export const removeTagFromTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId, tagId } = req.params;

  try {
    await _removeTagFromTask(userId, taskId, tagId);
    res
      .status(200)
      .json({ message: "Tag eliminado correctamente de la tarea" });
  } catch (error) {
    console.error("Error al eliminar tag de tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

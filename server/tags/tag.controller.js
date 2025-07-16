const tagModel = require("./tag.model");

const createTag = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "El nombre del tag es obligatorio" });
  }

  try {
    const tag = await tagModel.createTag(userId, name.trim());
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error al crear el tag:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const assignTagToTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const { tagId } = req.body;

  if (!tagId) {
    return res.status(400).json({ message: "El ID del tag es obligatorio" });
  }

  try {
    await tagModel.assignTagToTask(userId, taskId, tagId);
    res.status(200).json({ message: "Tag asignado correctamente a la tarea" });
  } catch (error) {
    console.error("Error al asignar tag a tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

const removeTagFromTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId, tagId } = req.params;

  try {
    await tagModel.removeTagFromTask(userId, taskId, tagId);
    res
      .status(200)
      .json({ message: "Tag eliminado correctamente de la tarea" });
  } catch (error) {
    console.error("Error al eliminar tag de tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

const filterTasksByTags = async (req, res) => {
  const userId = req.user.id;
  const { tags } = req.query;

  try {
    const tasks = await tagModel.getTasksByTagName(userId, tags);
    res.json(tasks);
  } catch (error) {
    console.error("Error al filtrar por tags:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  filterTasksByTags,
  createTag,
  assignTagToTask,
  removeTagFromTask,
};

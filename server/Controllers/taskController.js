const taskModel = require("../Models/taskModel");

const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await taskModel.getLatestTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas del usuario:", error);
    res.status(500).json({ message: "Error al obtener tareas del usuario" });
  }
}

const assignTagToTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const { tagId } = req.body;

  if (!tagId) {
    return res.status(400).json({ message: "El ID del tag es obligatorio" });
  }

  try {
    await taskModel.assignTagToTask(userId, taskId, tagId);
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
    await taskModel.removeTagFromTask(userId, taskId, tagId);
    res.status(200).json({ message: "Tag eliminado correctamente de la tarea" });
  } catch (error) {
    console.error("Error al eliminar tag de tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

const filterTasksByCategory = async (req, res) => {
  const userId = req.user.id;
  const { category } = req.query;

  try {
    const tasks = await taskModel.getTasksByCategory(userId, category);
    res.json(tasks);
  } catch (error) {
    console.error("Error al filtrar por categoría:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  try {
    await taskModel.createTask(userId, title, description, category);
    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description, category } = req.body;

  if (!title && !description && !category) {
    return res
      .status(400)
      .json({ message: "Al menos un campo debe ser actualizado" });
  }

  try {
    const task = await taskModel.findTaskById(taskId, userId);
    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada" });
    }

    const fields = [];
    const values = [];

    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (description) {
      fields.push("description = ?");
      values.push(description);
    }
    if (category) {
      fields.push("category = ?");
      values.push(category);
    }

    await taskModel.updateTask(taskId, userId, fields, values);
    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const result = await taskModel.deleteTask(taskId, userId);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};

module.exports = {
  getTasks,
  filterTasksByCategory,
  createTask,
  updateTask,
  deleteTask,
  assignTagToTask,
  removeTagFromTask,
};

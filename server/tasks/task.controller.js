import { getLatestTasks, createTask as _createTask, findTaskById, updateTask as _updateTask, deleteTask as _deleteTask } from "./task.model.js";

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await getLatestTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas del usuario:", error);
    res.status(500).json({ message: "Error al obtener tareas del usuario" });
  }
};

export const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  try {
    await _createTask(userId, title, description);
    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description } = req.body;

  if (!title && !description) {
    return res
      .status(400)
      .json({ message: "Al menos un campo debe ser actualizado" });
  }

  try {
    const task = await findTaskById(taskId, userId);
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

    await _updateTask(taskId, userId, fields, values);
    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

export const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const result = await _deleteTask(taskId, userId);
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


import {
  getInboxTasks as _getInboxTasks,
  getAllTasks as _getAllTasks,
  getCompletedTasks as _getCompletedTasks,
  createTask as _createTask,
  findTaskById,
  updateTask as _updateTask,
  deleteTask as _deleteTask,
  getTaskCompletionStatus as _getTaskCompletionStatus,
  toggleTaskCompletion as _toggleTaskCompletion,
  getFilteredTasks as _getFilteredTasks,
} from "./task.model.js";

export const getAllTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await _getAllTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener todas las tareas:", error);
    res.status(500).json({ message: "Error al obtener todas las tareas" });
  }
};

export const getInboxTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await _getInboxTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas de Inbox:", error);
    res.status(500).json({ message: "Error al obtener tareas del usuario" });
  }
};

export const getCompletedTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await _getCompletedTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas completadas:", error);
    res.status(500).json({ message: "Error al obtener tareas completadas" });
  }
};

export const getFilteredTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const filters = {
      priority: req.query.priority
        ? parseInt(req.query.priority, 10)
        : undefined,
      tagId: req.query.tagId ? parseInt(req.query.tagId, 10) : undefined,
      categoryId: req.query.categoryId
        ? parseInt(req.query.categoryId, 10)
        : undefined,
      isCompleted:
        req.query.completed === "true"
          ? true
          : req.query.completed === "false"
          ? false
          : undefined,
    };

    const tasks = await _getFilteredTasks(userId, filters);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  try {
    const newTask = await _createTask(userId, title, description);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({ message: "There is nothing to update" });
  }

  try {
    const task = await findTaskById(taskId, userId);
    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
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
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
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
        .json({ message: "Task not found or not authorized" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};

export const getTaskCompletionStatus = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const status = await _getTaskCompletionStatus(taskId, userId, "completed");

    if (status === null) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada." });
    }

    res.status(200).json({
      taskId,
      completed: status,
      isCompleted: status === 1,
    });
  } catch (error) {
    console.error(`Error al obtener el estado de la tarea ${taskId}:`, error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

export const toggleTaskCompletionStatus = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const currentStatus = await _getTaskCompletionStatus(
      taskId,
      userId,
      "completed"
    );

    if (currentStatus === null) {
      return res
        .status(404)
        .json({ message: "Tarea no encontrada o no autorizada." });
    }

    const newStatus = 1 - currentStatus;

    await _toggleTaskCompletion(taskId, userId, newStatus);

    res.status(200).json({
      message: `Tarea ${taskId} actualizada. Nuevo estado completado: ${newStatus}`,
      completed: newStatus,
      isCompleted: newStatus === 1,
    });
  } catch (error) {
    console.error(
      `Error al alternar el estado de completado de la tarea ${taskId}:`,
      error
    );
    res
      .status(500)
      .json({ message: "Error del servidor al actualizar la tarea." });
  }
};

import {
  getTaskPriority as _getTaskPriority,
  setTaskPriority as _setTaskPriority,
  deleteTaskPriority as _deleteTaskPriority
} from "./priority.model.js";

export const setTaskPriority = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { priority } = req.body;

  try {
    await _setTaskPriority(userId, taskId, priority);
    res.status(200).json({ message: "Prioridad actualizada con éxito." });
  } catch (error) {
    console.error("Error al establecer la prioridad:", error);
    if (error.message.includes("La prioridad debe ser un valor")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("no autorizada")) {
      return res.status(403).json({ message: error.message });
    }
    res.status(404).json({ message: "Tarea no encontrada." });
  }
};

export const getTaskPriority = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;

  try {
    const priority = await _getTaskPriority(userId, taskId);
    res.status(200).json({ priority });
  } catch (error) {
    console.error("Error al obtener la prioridad de la tarea:", error);
    if (error.message.includes("no autorizada")) {
      return res.status(403).json({ message: error.message });
    }
    res.status(404).json({ message: "Tarea no encontrada." });
  }
};

export const deleteTaskPriority = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;

  try {
    await _deleteTaskPriority(userId, taskId);
    res.status(200).json({ message: "Prioridad eliminada con éxito." });
  } catch (error) {
    console.error("Error al eliminar la prioridad:", error);
    if (error.message.includes("no autorizada")) {
      return res.status(403).json({ message: error.message });
    }
    res.status(404).json({ message: "Tarea no encontrada." });
  }
};

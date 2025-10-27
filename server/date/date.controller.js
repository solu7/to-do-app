import {
  setTaskDate as _setTaskDate,
  getTaskDate as _getTaskDate,
} from "./date.model.js";

export const getTaskDate = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;

  try {
    const taskDate = await _getTaskDate(userId, taskId);
    if (!taskDate) {
      return res
        .status(404)
        .json({ message: "No se encontró la fecha de la tarea." });
    }
    res.status(200).json(taskDate);
  } catch (error) {
    console.error("Error al obtener la fecha de la tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

export const setTaskDate = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { date } = req.body;

  try {
    if (!date) {
      return res.status(400).json({ message: "La fecha es requerida." });
    }
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split("T")[0];

    await _setTaskDate(userId, taskId, formattedDate);
    res
      .status(200)
      .json({ message: "Fecha de la tarea guardada correctamente." });
  } catch (error) {
    console.error("Error al guardar la fecha de la tarea:", error);
    res.status(400).json({ message: error.message });
  }
};

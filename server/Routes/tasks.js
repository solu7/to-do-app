const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../Middleware/verifyToken");

// Ruta para crear una nueva tarea
router.post("/", verifyToken, async (req, res) => {
  const { title, description, category, tags } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  try {
    await pool.query(
      "INSERT INTO tasks (user_id, title, description, category, tags) VALUES (?, ?, ?, ?, ?)",
      [userId, title, description, category, tags]
    );

    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});
// Ruta para obtener todas las tareas del usuario logeado
router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [tasks] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});
// Ruta para actualizar una tarea
router.patch("/:id", verifyToken, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { title, description, category, tags } = req.body;

  if (!title && !description && !category && !tags) {
    return res.status(400).json({ message: "Al menos un campo debe ser actualizado" });
  }

  try {
    const [task] = await pool.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId]);
    if (task.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
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
    if (tags) {
      fields.push("tags = ?");
      values.push(tags);
    }

    values.push(taskId, userId);

    const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`;

    await pool.query(sql, values);

    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});
module.exports = router;
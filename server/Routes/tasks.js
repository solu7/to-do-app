const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../Middleware/verifyToken");

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

module.exports = router;
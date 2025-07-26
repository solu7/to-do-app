import { getLatestTasks, createTask as _createTask, findTaskById, updateTask as _updateTask, deleteTask as _deleteTask } from "./task.model.js";

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await getLatestTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks from user:", error);
    res.status(500).json({ message: "Error getting tasks from user" });
  }
};

export const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    await _createTask(userId, title, description, category);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description, category } = req.body;

  if (!title && !description && !category) {
    return res
      .status(400)
      .json({ message: "There is nothing to update" });
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
    if (category) {
      fields.push("category = ?");
      values.push(category);
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
    res.json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};


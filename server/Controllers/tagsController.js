const tagModel = require("../Models/tagsModel");

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
};

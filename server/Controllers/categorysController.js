const categoryModel = require("../Models/categorysModel");

const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
  }

  try {
    const category = await categoryModel.createCategory(userId, name.trim());
    res.status(201).json(category);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  createCategory,
};
const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede superar los 500 caracteres"),
  body("category")
    .optional()
    .isIn(["personal", "trabajo", "estudio", "otro"])
    .withMessage("Categoría inválida"),
];

const updateTaskValidator = [
  body("title").optional().isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("category")
    .optional()
    .isIn(["personal", "trabajo", "estudio", "otro"]),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};
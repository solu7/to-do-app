import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];


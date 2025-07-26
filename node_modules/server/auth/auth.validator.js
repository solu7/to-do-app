import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Your username is too short"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("The password is too short")
    .matches(/[a-z]/)
    .withMessage("The password must be a lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("The password must have a capital letter")
    .matches(/\d/)
    .withMessage("The password must have a number")
    .matches(/[@$!%*?&]/)
    .withMessage("The password must have a special symbol"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

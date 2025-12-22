import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("The title can't be that long."),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("The description can't be that long."),
];

export const updateTaskValidator = [
  body("title").optional().isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
];

import { Router } from "express";
const router = Router();
import { login, register } from "../auth/auth.controller.js";
import { registerValidator } from "./auth.validator.js";
import { validationResult } from "express-validator";

router.post(
  "/register",
  registerValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);
router.post("/login", login);

export default router;

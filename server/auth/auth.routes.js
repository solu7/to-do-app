import { Router } from "express";
const router = Router();
import {
  login,
  register,
  loginAsGuest,
  refreshSession,
  logout,
} from "../auth/auth.controller.js";
import { registerValidator } from "./auth.validator.js";
import { validationResult } from "express-validator";
import { verifyRefreshableToken} from "./auth.middleware.js";

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
router.post("/guest", loginAsGuest);
router.post("/refresh", verifyRefreshableToken, refreshSession);
router.post("/logout", logout);

export default router;

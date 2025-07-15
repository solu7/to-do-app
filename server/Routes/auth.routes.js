const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller");
const { registerValidator } = require("../Validators/auth.validator");
const { validationResult } = require("express-validator");

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
  authController.login
);
router.post("/login", authController.login);

module.exports = router;

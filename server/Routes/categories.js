const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const categoryController = require("../Controllers/categorysController");

router.post("/", verifyToken, categoryController.createCategory);

module.exports = router;
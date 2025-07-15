const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth.middleware");
const taskController = require("../Controllers/taskController");

router.get("/", verifyToken, taskController.getTasks);

router.post("/", verifyToken, taskController.createTask);

router.patch("/:id", verifyToken, taskController.updateTask);

router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;

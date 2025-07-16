const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const taskController = require("../tasks/taskController");

router.get("/", verifyToken, taskController.getTasks);

router.post("/", verifyToken, taskController.createTask);

router.patch("/:id", verifyToken, taskController.updateTask);

router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;

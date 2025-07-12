const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const taskController = require("../Controllers/taskController");

router.get("/", verifyToken, taskController.getTasks);
router.get("/category", verifyToken, taskController.filterTasksByCategory);
router.get("/tags", verifyToken, taskController.filterTasksByTags);
router.post("/", verifyToken, taskController.createTask);
router.patch("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const taskController = require("../Controllers/taskController");

router.get("/", verifyToken, taskController.getTasks);
router.get("/category", verifyToken, taskController.filterTasksByCategory);

router.post("/", verifyToken, taskController.createTask);
router.post("/:taskId/tags", verifyToken, taskController.assignTagToTask);

router.patch("/:id", verifyToken, taskController.updateTask);

router.delete("/:id", verifyToken, taskController.deleteTask);
router.delete("/:taskId/tags/:tagId", verifyToken, taskController.removeTagFromTask);

module.exports = router;

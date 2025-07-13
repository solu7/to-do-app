const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const taskController = require("../Controllers/tasksController");

router.get("/", verifyToken, taskController.getTasks);
router.get("/category", verifyToken, taskController.filterTasksByCategory);

router.post("/", verifyToken, taskController.createTask);
router.post("/:taskId/tags", verifyToken, taskController.assignTagToTask);
router.post("/:taskId/categories", verifyToken, taskController.assignCategoriesToTask);

router.patch("/:id", verifyToken, taskController.updateTask);
                                                                                                
router.delete("/:id", verifyToken, taskController.deleteTask);
router.delete("/:taskId/tags/:tagId", verifyToken, taskController.removeTagFromTask);
router.delete("/:taskId/categories/:categoryId", verifyToken, taskController.removeCategoryFromTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const tagController = require("./tag.controller");

router.get("/:tagName/tasks", verifyToken, tagController.filterTasksByTags);

router.post("/createTag", verifyToken, tagController.createTag);
router.post("/:taskId/tags", verifyToken, tagController.assignTagToTask);

router.delete(
  "/:taskId/tags/:tagId",
  verifyToken,
  tagController.removeTagFromTask
);

module.exports = router;

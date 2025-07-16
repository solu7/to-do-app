const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const categoryController = require("./category.controller");

router.get("/:category", verifyToken, categoryController.filterTasksByCategory);

router.post("/", verifyToken, categoryController.createCategory);
router.post(
  "/assign/:taskId",
  verifyToken,
  categoryController.assignCategoriesToTask
);

router.delete(
  "/:taskId/categories/:categoryId",
  verifyToken,
  categoryController.removeCategoryFromTask
);

module.exports = router;

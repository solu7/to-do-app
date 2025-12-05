import { Router } from "express";
const router = Router();
import { verifyOnlyToken } from "../auth/auth.middleware.js";
import {
  createCategory,
  assignCategoryToTask,
  removeCategoryFromTask,
  getAllCategories,
  getCategoriesInTask
} from "./category.controller.js";

router.get("/", verifyOnlyToken, getAllCategories);

router.get("/:taskId", verifyOnlyToken, getCategoriesInTask);

router.post("/", verifyOnlyToken, createCategory);

router.post("/:taskId", verifyOnlyToken, assignCategoryToTask);

router.delete("/:taskId", verifyOnlyToken, removeCategoryFromTask);

export default router;

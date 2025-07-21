import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import {
  createCategory,
  assignCategoriesToTask,
  removeCategoryFromTask,
} from "./category.controller.js";

router.post("/", verifyToken, createCategory);

router.post("/:taskId", verifyToken, assignCategoriesToTask);

router.delete("/:taskId/:categoryId", verifyToken, removeCategoryFromTask);

export default router;

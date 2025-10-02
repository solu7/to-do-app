import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskCompletionStatus,
  toggleTaskCompletionStatus,
} from "./task.controller.js";

import { filterTasks } from "./filterTasks/filterTasks.controller.js";

router.get("/", verifyToken, getTasks);

router.get("/:id/status", verifyToken, getTaskCompletionStatus);

router.post("/", verifyToken, createTask);

router.post("/filter", verifyToken, filterTasks);

router.patch("/:id", verifyToken, updateTask);

router.patch("/:id/toggle", verifyToken, toggleTaskCompletionStatus);

router.delete("/:id", verifyToken, deleteTask);

export default router;

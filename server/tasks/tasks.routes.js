import { Router } from "express";
const router = Router();
import { verifyOnlyToken } from "../auth/auth.middleware.js";
import {
  getAllTasks,
  getInboxTasks,
  getCompletedTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskCompletionStatus,
  toggleTaskCompletionStatus,
  getFilteredTasks,
} from "./task.controller.js";

router.get("/", verifyOnlyToken, getInboxTasks);

router.get("/all", verifyOnlyToken, getAllTasks);

router.get("/filtered", verifyOnlyToken, getFilteredTasks);

router.get("/completed", verifyOnlyToken, getCompletedTasks);

router.get("/:id/status", verifyOnlyToken, getTaskCompletionStatus);

router.post("/", verifyOnlyToken, createTask);

router.patch("/:id", verifyOnlyToken, updateTask);

router.patch("/:id/toggle", verifyOnlyToken, toggleTaskCompletionStatus);

router.delete("/:id", verifyOnlyToken, deleteTask);

export default router;

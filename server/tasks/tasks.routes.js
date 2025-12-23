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
  setTaskDueDate,
  getTaskDueDate,
  getTodayTasks,
  getUpcomingTasks,
} from "./task.controller.js";

router.get("/", verifyOnlyToken, getInboxTasks);

router.get("/all", verifyOnlyToken, getAllTasks);

router.get("/today", verifyOnlyToken, getTodayTasks);

router.get("/upcoming", verifyOnlyToken, getUpcomingTasks);

router.get("/filtered", verifyOnlyToken, getFilteredTasks);

router.get("/completed", verifyOnlyToken, getCompletedTasks);

router.get("/:id/status", verifyOnlyToken, getTaskCompletionStatus);

router.get("/:taskId/date", verifyOnlyToken, getTaskDueDate);

router.post("/", verifyOnlyToken, createTask);

router.post("/:taskId/date", verifyOnlyToken, setTaskDueDate);

router.patch("/:id", verifyOnlyToken, updateTask);

router.patch("/:id/toggle", verifyOnlyToken, toggleTaskCompletionStatus);

router.delete("/:id", verifyOnlyToken, deleteTask);

export default router;

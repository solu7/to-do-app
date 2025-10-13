import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
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

router.get("/", verifyToken, getInboxTasks);

router.get("/all", verifyToken, getAllTasks);

router.get("/filtered", verifyToken, getFilteredTasks);

router.get("/completed", verifyToken, getCompletedTasks);

router.get("/:id/status", verifyToken, getTaskCompletionStatus);

router.post("/", verifyToken, createTask);

router.patch("/:id", verifyToken, updateTask);

router.patch("/:id/toggle", verifyToken, toggleTaskCompletionStatus);

router.delete("/:id", verifyToken, deleteTask);

export default router;

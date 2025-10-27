import { Router } from "express";
import verifyToken from "../auth/auth.middleware.js";
import { getTaskPriority, setTaskPriority, deleteTaskPriority } from "./priority.controller.js";

const router = Router();

router.get("/:taskId", verifyToken, getTaskPriority);

router.post("/:taskId", verifyToken, setTaskPriority);

router.delete("/:taskId", verifyToken, deleteTaskPriority);

export default router;

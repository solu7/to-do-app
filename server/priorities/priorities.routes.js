import { Router } from "express";
import { verifyOnlyToken } from "../auth/auth.middleware.js";
import { getTaskPriority, setTaskPriority, deleteTaskPriority } from "./priority.controller.js";

const router = Router();

router.get("/:taskId", verifyOnlyToken, getTaskPriority);

router.post("/:taskId", verifyOnlyToken, setTaskPriority);

router.delete("/:taskId", verifyOnlyToken, deleteTaskPriority);

export default router;

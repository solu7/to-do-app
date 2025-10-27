import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import { setTaskDate, getTaskDate } from "./date.controller.js";

router.get("/:taskId", verifyToken, getTaskDate);
router.post("/:taskId", verifyToken, setTaskDate);

export default router;
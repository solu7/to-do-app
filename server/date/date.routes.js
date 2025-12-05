import { Router } from "express";
const router = Router();
import { verifyOnlyToken } from "../auth/auth.middleware.js";
import { setTaskDate, getTaskDate } from "./date.controller.js";

router.get("/:taskId", verifyOnlyToken, getTaskDate);
router.post("/:taskId", verifyOnlyToken, setTaskDate);

export default router;
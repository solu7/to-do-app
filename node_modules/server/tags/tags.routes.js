import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import { createTag, assignTagToTask, removeTagFromTask } from "./tag.controller.js";

router.post("/", verifyToken, createTag);

router.post("/:taskId", verifyToken, assignTagToTask);

router.delete("/:taskId/:tagId", verifyToken, removeTagFromTask);

export default router;

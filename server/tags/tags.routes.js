import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import { createTag, assignTagToTask, removeTagFromTask, getTagsInTask, getTagsByUserId } from "./tag.controller.js";

router.get("/", verifyToken, getTagsByUserId);

router.get("/:taskId", verifyToken, getTagsInTask);

router.post("/", verifyToken, createTag);

router.post("/:taskId", verifyToken, assignTagToTask);

router.delete("/:taskId", verifyToken, removeTagFromTask);

export default router;

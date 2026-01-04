import { Router } from "express";
const router = Router();
import { verifyOnlyToken } from "../auth/auth.middleware.js";
import {
  createTag,
  deleteTag,
  assignTagToTask,
  removeTagFromTask,
  getTagsInTask,
  getTagsByUserId,
} from "./tag.controller.js";

router.get("/", verifyOnlyToken, getTagsByUserId);

router.get("/:taskId", verifyOnlyToken, getTagsInTask);

router.post("/", verifyOnlyToken, createTag);

router.post("/:taskId", verifyOnlyToken, assignTagToTask);

router.delete("/:taskId", verifyOnlyToken, removeTagFromTask);

router.delete("/resource/:tagId", verifyOnlyToken, deleteTag);

export default router;

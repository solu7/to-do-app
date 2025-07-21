import { Router } from "express";
const router = Router();
import verifyToken from "../auth/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./task.controller.js";

import { filterTasks } from "./filterTasks/filterTasks.controller.js";

router.get("/", verifyToken, getTasks);

router.post("/", verifyToken, createTask);

router.patch("/:id", verifyToken, updateTask);

router.delete("/:id", verifyToken, deleteTask);

router.post("/filter", verifyToken, filterTasks);

export default router;

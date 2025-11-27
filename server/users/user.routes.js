import { Router } from "express";
import { getUserData, updateUsername } from "./user.controller.js";
import verifyToken from "../auth/auth.middleware.js";
const router = Router();

router.get("/", verifyToken, getUserData);
router.put("/username", verifyToken, updateUsername);

export default router;

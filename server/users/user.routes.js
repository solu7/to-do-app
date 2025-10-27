import { Router } from "express";
import { getUsernameByUserId } from "./user.controller.js";
import verifyToken from "../auth/auth.middleware.js";
const router = Router();

router.get("/", verifyToken, getUsernameByUserId);

export default router;

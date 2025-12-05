import { Router } from "express";
import { getUserData, updateUsername, updatePassword, deleteAccount } from "./user.controller.js";
import { authenticateUser } from "../auth/auth.middleware.js";
const router = Router();

router.get("/", authenticateUser, getUserData);
router.put("/username", authenticateUser, updateUsername);
router.put('/password', authenticateUser, updatePassword);
router.delete('/account', authenticateUser, deleteAccount);
export default router;

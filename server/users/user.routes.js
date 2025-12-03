import { Router } from "express";
import { getUserData, updateUsername, updatePassword, deleteAccount } from "./user.controller.js";
import verifyToken from "../auth/auth.middleware.js";
const router = Router();

router.get("/", verifyToken, getUserData);
router.put("/username", verifyToken, updateUsername);
router.put('/password', verifyToken, updatePassword);
router.delete('/account', verifyToken, deleteAccount);
export default router;

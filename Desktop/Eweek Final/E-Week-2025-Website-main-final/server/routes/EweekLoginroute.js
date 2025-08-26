import { Router } from "express";
const router = Router();
import { login,register } from "../controllers/EweekLoginController.js";
import { verifyToken } from "../middleware.js";

router.post("/login", login);
router.post("/register", register);
router.post("/admin", verifyToken, );

export default router;

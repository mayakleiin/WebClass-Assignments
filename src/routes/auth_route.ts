import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";

// Routes
router.post("/register", authController.register); // Register a New User
router.post("/login", authController.login); // Login a User
router.post("/logout", authController.logout); // Logout a User
router.post("/refresh", authController.refresh); // Refresh a Token

export default router;

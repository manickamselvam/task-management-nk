import express from "express";
import {
  register,
  login,
  getProfile,
  getAllUsers,
  forgotPassword,
} from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.get("/users", protect, isAdmin, getAllUsers);
router.post("/forgot-password", forgotPassword);

export default router;

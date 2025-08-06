// import express from "express";
// import {
//   register,
//   login,
//   getProfile,
//   getAllUsers,
//   forgotPassword,
// } from "../controllers/authController.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", protect, getProfile);
// router.get("/users", protect, isAdmin, getAllUsers);
// router.post("/forgot-password", forgotPassword);

// export default router;

// New

// import express from "express";
// import { registerUser } from "../controllers/authController.js";

const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

// export default router;
module.exports = router;

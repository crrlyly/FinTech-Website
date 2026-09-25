import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.get("/currentUser", getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import {
  signup,
  login,
  logout,
  getCurrentUser,
  updateUser,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.get("/currentUser", getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/", updateUser);


export default router;

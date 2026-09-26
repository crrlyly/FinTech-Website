import express from "express";

import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalsController";

const router = express.Router();

router.get("/", getGoals);
router.post("/", addGoal);
router.patch("/:gid", updateGoal);
router.delete("/:gid", deleteGoal);

export default router;

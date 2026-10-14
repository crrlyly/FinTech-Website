import express from "express";

import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalsController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import {
  validateGoalId,
  validateGoalForm,
} from "../middleware/validateGoal.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getGoals);
router.post("/", validateGoalForm, addGoal);
router.patch("/:gid", validateGoalForm, validateGoalId, updateGoal);
router.delete("/:gid", validateGoalId, deleteGoal);

export default router;

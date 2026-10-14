import express from "express";

import {
  getBudgets,
  updateBudget,
  createNewBudgets,
  getCurrBudgets,
} from "../controllers/budgetController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBudgetForm } from "../middleware/validateBudget.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getBudgets);
router.get("/curr", getCurrBudgets);
router.patch("/:bid", validateBudgetForm, updateBudget);
router.post("/", createNewBudgets);

export default router;

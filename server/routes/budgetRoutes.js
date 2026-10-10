import express from "express";

import {
  getBudgets,
  updateBudget,
  createNewBudgets,
  getCurrBudgets,
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", getBudgets);
router.get("/curr", getCurrBudgets);
router.patch("/:bid", updateBudget);
router.post("/", createNewBudgets);

export default router;

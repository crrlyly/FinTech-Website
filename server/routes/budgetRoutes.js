import express from "express";

import { getBudgets, updateBudget } from "../controllers/budgetController";

const router = express.Router();

router.get("/", getBudgets);
router.patch("/:gid", updateBudget);

export default router;

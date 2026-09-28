import express from "express";

import { getBudgets, updateBudget } from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", getBudgets);
router.patch("/:gid", updateBudget);

export default router;

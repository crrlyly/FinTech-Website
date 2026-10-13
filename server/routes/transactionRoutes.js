import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import { validateTransaction } from "../middleware/validateTransaction.js";

import express from "express";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", validateTransaction, addTransaction);
router.patch("/:tid", updateTransaction);
router.delete("/:tid", deleteTransaction);

export default router;

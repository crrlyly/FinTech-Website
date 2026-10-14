import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import {
  validateTransactionForm,
  validateTransactionId,
} from "../middleware/validateTransaction.js";
import { requireAuth } from "../middleware/requireAuth.js";

import express from "express";

const router = express.Router();

// Apply authentication to ALL routes below
router.use(requireAuth);

router.get("/", getTransactions);
router.post("/", validateTransactionForm, addTransaction);
router.patch(
  "/:tid",

  validateTransactionId,
  validateTransactionForm,
  updateTransaction,
);
router.delete("/:tid", validateTransactionId, deleteTransaction);

export default router;

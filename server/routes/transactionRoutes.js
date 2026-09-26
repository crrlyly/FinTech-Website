import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "../controllers/transactionController";

import express from "express";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.patch("/", updateTransaction);
router.delete("/", deleteTransaction);

export default router;

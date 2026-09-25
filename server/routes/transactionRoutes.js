import { getTransactions } from "../controllers/transactionController";

import express from "express";

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/addTransactions", getTransactions);

export default router;

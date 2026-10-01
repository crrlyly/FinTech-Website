import StatCard from "../shared/StatCard";
import type { GetActivationProp } from "../../../pages/app/Budgets";
import { getTransactions } from "../../../services/transactionApi";
import { getBudgets } from "../../../services/budgetApi";
import { useEffect, useState } from "react";
import type { Transaction } from "../../../models/Transaction";
import type { Budget } from "../../../models/Budget";

const BudgetStats = ({ activateBudget }: GetActivationProp) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    async function loadLists() {
      const { transactions: tList } = await getTransactions();
      const { budgets: bList } = await getBudgets();
      setTransactions(tList);
      setBudgets(bList);
    }

    loadLists();
  }, []);

  return (
    <div
      className={`${activateBudget ? "grid" : "hidden"} w-full h-auto bg-(--primary) grid-cols-2 gap-3 p-5`}
    >
      <StatCard transactions={transactions} budgets={budgets} action="income"></StatCard>
      <StatCard transactions={transactions} budgets={budgets} action="total"></StatCard>
      <StatCard transactions={transactions} budgets={budgets} action="spent"></StatCard>
      <StatCard transactions={transactions} budgets={budgets} action="unallocated"></StatCard>
    </div>
  );
};

export default BudgetStats;

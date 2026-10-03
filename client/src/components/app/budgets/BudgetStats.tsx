import StatCard from "../shared/StatCard";
import type { GetActivationProp } from "../../../pages/app/Budgets";
import { getBudgets } from "../../../services/budgetApi";
import { useEffect, useState } from "react";
import type { Budget } from "../../../models/Budget";

const BudgetStats = ({ activateBudget }: GetActivationProp) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    async function loadLists() {
      const { budgets: bList } = await getBudgets();
      setBudgets(bList);
    }

    loadLists();
  }, []);

  return (
    <div
      className={`${activateBudget ? "grid" : "hidden"} w-full h-auto bg-(--primary) grid-cols-2 gap-3 p-5 lg:flex lg:gap-5`}
    >
      <StatCard budgets={budgets} action="income"></StatCard>
      <StatCard budgets={budgets} action="total"></StatCard>
      <StatCard budgets={budgets} action="spent"></StatCard>
      <StatCard budgets={budgets} action="unallocated"></StatCard>
    </div>
  );
};

export default BudgetStats;

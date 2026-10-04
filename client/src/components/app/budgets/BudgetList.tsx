import BudgetCard from "./BudgetCard";
import { getBudgets } from "../../../services/budgetApi";
import type { Budget } from "../../../models/Budget";
import { useEffect, useState } from "react";
import { getExpenseByCategory } from "../../../helpers/budgetHelper";
import type { GetActivationProp } from "../../../pages/app/Budgets";
import { useTransactionStore } from "../../../stores/TransactionStore";

const BudgetList = ({ activateBudget }: GetActivationProp) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const transactions = useTransactionStore((s) => s.transactions);

  async function loadBudgets() {
    try {
      const { budgets: loadedBudgets } = await getBudgets();
      setBudgets(loadedBudgets);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadBudgets();
  }, []);
  return (
    <div
      className={`${activateBudget ? "flex" : "hidden"} w-full h-auto bg-(--primary) p-5 flex-col items-center flex-1 gap-5`}
    >
      {budgets.map((b) => {
        const usedMoney: number = getExpenseByCategory(
          transactions,
          b.category,
        );
        return (
          <BudgetCard
            key={b.bid}
            budget={b}
            usedMoney={usedMoney}
            loadBudgets={loadBudgets}
          />
        );
      })}
    </div>
  );
};

export default BudgetList;

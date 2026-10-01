import BudgetCard from "./BudgetCard";
import { getBudgets } from "../../../services/budgetApi";
import type { Budget } from "../../../models/Budget";
import { useEffect, useState } from "react";
import type { Transaction } from "../../../models/Transaction";
import { getTransactions } from "../../../services/transactionApi";
import { getPriceByCategory } from "../../../helpers/budgetHelper";
import type { GetActivationProp } from "../../../pages/app/Budgets";

const BudgetList = ({ activateBudget }: GetActivationProp) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadBudgets() {
    try {
      const { budgets: loadedBudgets } = await getBudgets();
      setBudgets(loadedBudgets);
      console.log(loadedBudgets);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadTransactions() {
      try {
        const { transactions } = await getTransactions();
        setTransactions(transactions);
        console.log(transactions);
      } catch (error) {
        console.error(error);
      }
    }
    loadBudgets();
    loadTransactions();
  }, []);
  return (
    <div
      className={`${activateBudget ? "flex" : "hidden"} w-full h-auto bg-(--primary) p-5 flex-col items-center flex-1 gap-5`}
    >
      {budgets.map((b) => {
        const usedMoney: number = getPriceByCategory(transactions, b.category);
        console.log(transactions);
        console.log(usedMoney);
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

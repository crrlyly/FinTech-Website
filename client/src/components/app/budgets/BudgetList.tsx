import BudgetCard from "./BudgetCard";
import {
  getExpenseByCategory,
  getPast4MonthsBudget,
} from "../../../helpers/budgetHelper";
import { useTransactionStore } from "../../../stores/TransactionStore";
import { useBudgetStore } from "../../../stores/BudgetStore";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";
import { useMemo } from "react";

const BudgetList = () => {
  const transactions = useTransactionStore((s) => s.transactions);
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  const allBudgets = useBudgetStore((s) => s.allBudgets);
  const past4Months = useMemo(
    () => getPast4MonthsBudget(allBudgets),
    [allBudgets],
  );
  const selectedMonthIndex = useBudgetStore((s) => s.selectedMonthIndex);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "flex lg:grid" : "hidden";
  }
  return (
    <div
      className={`${isEveryMonthOn()} w-full h-auto mb-5 bg-(--primary) p-5 flex-col items-center flex-1 gap-5 lg:grid-cols-2 lg:grid-rows-auto lg:max-h-200`}
    >
      {past4Months[selectedMonthIndex].budget.length > 0 ? (
        past4Months[selectedMonthIndex].budget.map((b) => {
          const usedMoney: number = getExpenseByCategory(
            transactions,
            b.category,
          );
          return <BudgetCard key={b.bid} budget={b} usedMoney={usedMoney} />;
        })
      ) : (
        <span className={`text-white self-start`}>No budget data for this month</span>
      )}
    </div>
  );
};

export default BudgetList;

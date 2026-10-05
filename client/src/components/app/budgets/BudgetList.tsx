import BudgetCard from "./BudgetCard";
import { getExpenseByCategory } from "../../../helpers/budgetHelper";
import { useTransactionStore } from "../../../stores/TransactionStore";
import { useBudgetStore } from "../../../stores/BudgetStore";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";

const BudgetList = () => {
  const transactions = useTransactionStore((s) => s.transactions);
  const budgets = useBudgetStore((s) => s.budgets);
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "flex lg:grid" : "hidden";
  }
  return (
    <div
      className={`${isEveryMonthOn()} w-full h-auto bg-(--primary) p-5 flex-col items-center flex-1 gap-5 lg:grid-cols-2 lg:grid-rows-auto`}
    >
      {budgets.map((b) => {
        const usedMoney: number = getExpenseByCategory(
          transactions,
          b.category,
        );
        return <BudgetCard key={b.bid} budget={b} usedMoney={usedMoney} />;
      })}
    </div>
  );
};

export default BudgetList;

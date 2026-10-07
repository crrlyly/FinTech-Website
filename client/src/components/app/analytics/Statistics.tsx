import {
  getCurrentMonthExpenses,
  getLastMonthExpenses,
} from "../../../helpers/analysisHelper";
import { useTransactionStore } from "../../../stores/TransactionStore";
import StatCard from "./StatCard";

const Statistics = () => {
  const transactions = useTransactionStore((s) => s.transactions);
  const expense = getCurrentMonthExpenses(transactions);
  const lastMonthExpense = getLastMonthExpenses(transactions);
  const difference = expense - lastMonthExpense;
  const change = (difference / lastMonthExpense) * 100;
  return (
    <div
      className={`w-full h-auto bg-(--primary) flex flex-col justify-center p-5 gap-5 lg:flex-row lg:mt-5`}
    >
      <StatCard
        action="spending this month"
        value={`$${expense.toFixed(2)}`}
      ></StatCard>
      <StatCard
        action="vs last month"
        value={`${difference >= 0 ? "+" : ""}${difference.toFixed(2)}`}
      ></StatCard>
      <StatCard
        action="Change"
        value={`${difference >= 0 ? "+" : ""}${change.toFixed(0)}%`}
      ></StatCard>
    </div>
  );
};

export default Statistics;

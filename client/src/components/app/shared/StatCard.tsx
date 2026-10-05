import {
  getExpense,
  getIncome,
  getTotalBudgeted,
  unallocatedMoney,
} from "../../../helpers/budgetHelper";
import { useTransactionStore } from "../../../stores/TransactionStore";
import { getTotalBalance } from "../../../helpers/dashboardHelpers";
import { savedInGoals } from "../../../helpers/goalHelper";
import { useGoalStore } from "../../../stores/GoalStore";
import { useBudgetStore } from "../../../stores/BudgetStore";

interface StatCardProps {
  area?: "balance" | "saved" | "available";
  action?: "income" | "total" | "spent" | "unallocated";
}

const StatCard = ({ area, action }: StatCardProps) => {
  const transactions = useTransactionStore((s) => s.transactions);
  const goals = useGoalStore((s) => s.goals);
  const budgets = useBudgetStore((s) => s.budgets);

  function determineAction(): [string, number] {
    switch (action) {
      case "income":
        return ["Income this month", getIncome(transactions)];

      case "total":
        return ["Total budgeted", budgets ? getTotalBudgeted(budgets) : 0];

      case "spent":
        return ["Spent so far", getExpense(transactions)];

      case "unallocated":
        return [
          "Unallocated",
          budgets ? unallocatedMoney(transactions, budgets) : 0,
        ];

      default:
        return ["", 0];
    }
  }

  function determineAction2(): [string, number] {
    switch (area) {
      case "balance":
        return ["Total balance", getTotalBalance(transactions)];

      case "saved":
        return ["Saved in goals", savedInGoals(goals)];

      case "available":
        return [
          "Available to spend",
          getTotalBalance(transactions) - savedInGoals(goals),
        ];

      default:
        return ["", 0];
    }
  }

  return (
    <div
      style={{ gridArea: area }}
      className={`w-full h-auto bg-(--card) border border-white/10 rounded-[10px] p-3 text-white lg:p-5`}
    >
      <div className={`text-(--greyText) lg:text-[1.2rem]`}>
        {action ? determineAction()[0] : determineAction2()[0]}
      </div>
      <div className={`text-2xl font-bold lg:text-4xl`}>
        ${action ? determineAction()[1] : determineAction2()[1]}
      </div>
    </div>
  );
};

export default StatCard;

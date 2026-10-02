import type { Budget } from "../../../models/Budget";
import type { Transaction } from "../../../models/Transaction";
import {
  getExpense,
  getIncome,
  getTotalBudgeted,
  unallocatedMoney,
} from "../../../helpers/budgetHelper";

interface StatCardProps {
  area?: "balance" | "saved" | "available";
  transactions: Transaction[];
  budgets?: Budget[];
  action?: "income" | "total" | "spent" | "unallocated";
}

const StatCard = ({ area, transactions, budgets, action }: StatCardProps) => {
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
        return ["Total balance", 0];

      case "saved":
        return ["Saved in goals", 0];

      case "available":
        return ["Available to spend", 0];

      default:
        return ["", 0];
    }
  }

  return (
    <div
      style={{ gridArea: area }}
      className={`w-full h-auto bg-(--card) border border-white/10 rounded-[10px] p-3 text-white`}
    >
      <div className={`text-(--greyText)`}>
        {action ? determineAction()[0] : determineAction2()[0]}
      </div>
      <div className={`text-2xl font-bold`}>${action ? determineAction()[1] : determineAction2()[1]}</div>
    </div>
  );
};

export default StatCard;

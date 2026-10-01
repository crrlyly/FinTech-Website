import type { Budget } from "../../../models/Budget";
import type { Transaction } from "../../../models/Transaction";

interface StatCardProps {
  area?: "balance" | "saved" | "available";
  transactions: Transaction[];
  budgets?: Budget[];
  action?: "income" | "total" | "spent" | "unallocated";
}
const StatCard = ({ area, transactions, budgets, action }: StatCardProps) => {
  return (
    <div
      style={{ gridArea: area }}
      className={`w-full h-auto bg-(--card) border border-white/10 rounded-[10px] p-3 text-white`}
    >
      <div className={`text-(--greyText)`}>Income this month</div>
      <div className={`text-2xl font-bold`}>$5000.00</div>
    </div>
  );
};

export default StatCard;

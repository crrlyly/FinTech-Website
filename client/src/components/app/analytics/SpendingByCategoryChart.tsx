import { useEffect, useState } from "react";

import { useTransactionStore } from "../../../stores/TransactionStore";
import type { Transaction } from "../../../models/Transaction";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";

type Data = {
  expenses: number;
  category: string;
};
type GroupMap = {
  [category: string]: Data;
};

const SpendingByCategoryChart = () => {
  const [yearlyTransactions, setYearlyTransactions] = useState<Data[]>([]);
  const currentYear: number = new Date().getFullYear();
  const transactions = useTransactionStore((s) => s.transactions);

  const colors = [
    "#8b5cf6",
    "#2dd4bf",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#e000d5",
  ];

  useEffect((): void => {
    async function loadYearlyStats(): Promise<void> {
      try {
        const groupedMap: GroupMap = transactions
          .filter(
            (t: Transaction): boolean =>
              t.date.slice(0, 4) === String(currentYear),
          )
          .filter((t: Transaction) => t.type === "expense")
          .reduce((acc: GroupMap, tx: Transaction) => {
            if (!acc[tx.category]) {
              acc[tx.category] = { category: tx.category, expenses: 0 };
            }
            if (tx.type === "expense") {
              acc[tx.category].expenses += Number(tx.amount);
            }

            return acc;
          }, {});
        console.log(groupedMap);
        const chartData = Object.values(groupedMap).map((item, index) => ({
          ...item,
          fill: colors[index % colors.length],
        }));

        setYearlyTransactions(chartData);
      } catch (error) {
        console.error(error);
      }
    }

    loadYearlyStats();
  }, [transactions, currentYear]);

  return (
    <div className={`w-full h-auto p-5`}>
      <div
        className={`w-full h-100  bg-(--card) p-10 flex flex-col justify-center border border-white/10 rounded-[20px]`}
      >
        <div className={`text-white text-[1.2rem] font-bold`}>
          Spending by Category for the Year
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={yearlyTransactions}
              dataKey="expenses"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              shape={(props) => <Sector {...props} fill={props.payload.fill} />}
            />

            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingByCategoryChart;

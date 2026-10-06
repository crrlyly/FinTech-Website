import { useEffect, useState } from "react";
import type {
  Data,
  YearlyTransactionStatsMap,
} from "../dashboard/SpendingGraph";
import { useTransactionStore } from "../../../stores/TransactionStore";
import type { Transaction } from "../../../models/Transaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomevsExpensesChart = () => {
  const [yearlyTransactions, setYearlyTransactions] = useState<Data[]>([]);
  const currentYear: number = new Date().getFullYear();
  const transactions = useTransactionStore((s) => s.transactions);

  useEffect((): void => {
    async function loadYearlyStats(): Promise<void> {
      try {
        const monthsOrder: string[] = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const groupedMap: YearlyTransactionStatsMap = transactions
          .filter(
            (t: Transaction): boolean =>
              t.date.slice(0, 4) === String(currentYear),
          )
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .reduce<YearlyTransactionStatsMap>(
            (
              acc: YearlyTransactionStatsMap,
              tx: Transaction,
            ): YearlyTransactionStatsMap => {
              // Gets short month name
              const date: Date = new Date(tx.date);
              const month: string = monthsOrder[date.getMonth()];

              // Initialize the month grouping if it doesn't exist
              if (!acc[month]) {
                acc[month] = { month, income: 0, expenses: 0 };
              }

              // Aggregate amounts dynamically based on transaction type
              if (tx.type === "income") {
                acc[month].income += Number(tx.amount);
              } else if (tx.type === "expense") {
                acc[month].expenses += Number(tx.amount); // mapping 'expense' type to your 'expenses' key
              }

              return acc;
            },
            {},
          );
        setYearlyTransactions(Object.values(groupedMap)); // turns the object into an array
        console.log(Object.values(groupedMap));
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
          Income vs Expenses For the Year
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            margin={{
              top: 20,
              right: 0,
              left: -20,
              bottom: 0,
            }}
            data={yearlyTransactions}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.1}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="income" fill="#2dd4bf" radius={[6, 6, 0, 0]} />

            <Bar dataKey="expenses" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomevsExpensesChart;

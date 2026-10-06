import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  //   YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Transaction } from "../../../models/Transaction";
// import { getTransactions } from "../../../services/transactionApi";
// import type { TransactionProps } from "./Header";
import { useTransactionStore } from "../../../stores/TransactionStore";

export interface Data {
  month: string;
  income: number;
  expenses: number;
}

export interface YearlyTransactionStatsMap {
  [month: string]: Data;
}

const SpendingGraph = () => {
  const [yearlyTransactions, setYearlyTransactions] = useState<Data[]>([]);
  const currentYear: number = new Date().getFullYear();
  const transactions = useTransactionStore((s) => s.transactions);

  useEffect((): void => {
    async function loadYearlyStats(): Promise<void> {
      try {
        // const { transactions }: { transactions: Transaction[] } =
        //   await getTransactions();

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
      } catch (error) {
        console.error(error);
      }
    }

    loadYearlyStats();
  }, [transactions, currentYear]);

  return (
    <div
      className={`w-full h-100 flex justify-center items-center bg-(--primary) lg:h-full lg:col-span-2 p-5`}
    >
      <div
        className={`w-full p-10 rounded-2xl bg-(--card) border border-white/10`}
      >
        <span
          className={`text-[1.1rem] text-white lg:text-[1.3rem] lg:font-bold`}
        >
          Yearly Spending Overview
        </span>

        <div className={`w-full h-60 lg:h-100`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyTransactions}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c0c5" stopOpacity={0.4} />

                  <stop offset="100%" stopColor="(#22c0c5)" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="outcomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--purple)"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--purple)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#ffffff"
                strokeOpacity={0.1}
              ></CartesianGrid>
              <XAxis
                dataKey="month"
                padding={{ left: 7, right: 7 }}
                tick={{ fill: "#ffffff80" }}
              ></XAxis>
              {/* <YAxis /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#22c0c5"
                strokeWidth={3}
                fill="url(#incomeGradient)"
              ></Area>

              <Area
                type="monotone"
                dataKey="expenses"
                stroke="var(--purple)"
                strokeWidth={3}
                fill="url(#outcomeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpendingGraph;

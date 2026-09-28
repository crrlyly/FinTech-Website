import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";
import { getTransactions } from "../../../services/transactionApi";
import type { Transaction } from "../../../models/Transaction";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

    loadTransactions();
  }, []);

  return (
    <div
      className={`w-full h-auto bg-pink-700 flex justify-center items-center p-5`}
    >
      <div className={`w-full h-auto bg-blue-200 flex flex-col`}>
        <div className={`flex justify-between p-5`}>
          Recent Transactions <Link to="/transactions">View all</Link>
        </div>
        <div
          className={`w-full min-h-50 bg-pink-200 flex flex-col items-center gap-5 p-5`}
        >
          {transactions.slice(-4).map((t) => (
            <TransactionCard key={t.tid} transaction={t}></TransactionCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;

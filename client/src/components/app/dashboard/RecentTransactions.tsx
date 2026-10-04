import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";
// import { getTransactions } from "../../../services/transactionApi";
// import type { Transaction } from "../../../models/Transaction";
import { useTransactionStore } from "../../../stores/TransactionStore";

const RecentTransactions = () => {
  const transactions = useTransactionStore((s) => s.transactions);

  return (
    <div
      className={`w-full h-auto bg-(--primary) flex justify-center items-center p-5 lg:col-span-2 lg:h-full`}
    >
      <div
        className={`w-full h-auto bg-(--card) flex flex-col rounded-2xl border border-white/10 lg:h-full`}
      >
        <div
          className={`flex justify-between items-center px-7 pt-7 mb-2 text-white font-bold text-[1.2rem]`}
        >
          Recent Transactions{" "}
          <Link
            to="/transactions"
            className={`text-[.9rem] text-(--purple) font-normal hover:underline`}
          >
            View all
          </Link>
        </div>
        <div
          className={`w-full min-h-50 bg-(--card) flex flex-col items-center gap-5 p-5 text-white`}
        >
          {transactions.length > 0 ? (
            transactions
              .slice(0, 4)
              .map((t) => (
                <TransactionCard key={t.tid} transaction={t}></TransactionCard>
              ))
          ) : (
            <div className={`self-start text-(--greyText) ml-2`}>
              Please add transactions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;

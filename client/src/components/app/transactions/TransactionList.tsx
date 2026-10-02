import TransactionCard from "./TransactionCard";
import type { Transaction } from "../../../models/Transaction";

type TransactionListProps = {
  transactionList: Transaction[];
  loadTransactions: () => Promise<void>;
};

const TransactionList = ({
  transactionList,
  loadTransactions,
}: TransactionListProps) => {
  let count = 0;

  return (
    <div
      className={`w-full h-auto flex-1 bg-(--primary) flex flex-col gap-5 px-5 pb-5 overflow-y-auto md:gap-0`}
    >
      <div
        className={`text-(--greyText) sm:hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] rounded-t-[20px] w-full h-auto bg-(--card) border border-white/10 py-3 px-5`}
      >
        <div className={`w-full flex items-center`}>Description</div>
        <div className={`w-full flex items-center`}>Category</div>
        <div className={`w-full flex items-center`}>Date</div>
        <div className={`w-full flex items-center`}>Amount</div>
        <div className="w-full flex justify-end items-center"> Actions</div>
      </div>
      {transactionList.map((transaction) => {
        count += 1;
        if (count === transactionList.length) {
          return (
            <TransactionCard
              loadTransactions={loadTransactions}
              key={transaction.tid}
              transaction={transaction}
              last={true}
            ></TransactionCard>
          );
        }
        return (
          <TransactionCard
            loadTransactions={loadTransactions}
            key={transaction.tid}
            transaction={transaction}
          ></TransactionCard>
        );
      })}
    </div>
  );
};

export default TransactionList;

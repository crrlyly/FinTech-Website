import TransactionCard from "./TransactionCard";
import type { Transaction } from "../../../models/Transaction";

type TransactionListProps = {
  transactionList: Transaction[];
  loadTransactions: () => Promise<void>;
};

const TransactionList = ({ transactionList, loadTransactions }: TransactionListProps) => {
  return (
    <div
      className={`w-full h-auto flex-1 bg-(--primary) flex flex-col gap-5 p-5 overflow-y-auto`}
    >
      {transactionList.map((transaction) => (
        <TransactionCard
          loadTransactions={loadTransactions}
          key={transaction.tid}
          transaction={transaction}
        ></TransactionCard>
      ))}
    </div>
  );
};

export default TransactionList;

import TransactionCard from "./TransactionCard";
import type { dummyTransactionsProps } from "./TransactionPage";

type TransactionListProps = {
  transactionList: dummyTransactionsProps[];
};

const TransactionList = ({ transactionList }: TransactionListProps) => {
  return (
    <div
      className={`w-full h-auto flex-1 bg-pink-200 flex flex-col gap-5 p-5 overflow-y-auto`}
    >
      {transactionList.map((transaction) => (
        <TransactionCard key={transaction.name} transaction={transaction}></TransactionCard>
      ))}
    </div>
  );
};

export default TransactionList;

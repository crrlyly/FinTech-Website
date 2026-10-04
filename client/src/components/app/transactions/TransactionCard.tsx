import { useState } from "react";
import type { Transaction } from "../../../models/Transaction";
import AddTransaction from "../shared/AddTransaction";
// import { deleteTransaction } from "../../../services/transactionApi";
import { useTransactionStore } from "../../../stores/TransactionStore";

type TransactionCardProps = {
  transaction: Transaction;
  last?: boolean;
};

const TransactionCard = ({ transaction, last }: TransactionCardProps) => {
  const [active, setActive] = useState<boolean>(false);
  const deleteTransaction = useTransactionStore(
    (s) => s.deleteStoreTransaction,
  );

  const handleClick = () => {
    setActive((p) => !p);
  };

  const deleteClick = async () => {
    deleteTransaction(transaction.tid);
  };

  return (
    <>
      <div
        className={`md:hidden relative w-full h-auto bg-(--card) rounded-2xl border border-white/10 text-white`}
      >
        <div className={`flex justify-between items-center p-5`}>
          <div className={`flex flex-col`}>
            <span>{transaction.name}</span>
            <span className={`text-(--greyText)`}>
              {transaction.date.split("T")[0]}
            </span>
          </div>
          <div className={`flex flex-col`}>
            <span className={`text-(--greyText) capitalize`}>
              {transaction.category}
            </span>
            <span>
              {transaction.type === "expense" ? "-" : "+"}${transaction.amount}
            </span>
          </div>
        </div>
        <div className={`w-full h-auto flex p-5 justify-end`}>
          <button onClick={() => handleClick()} className={`text-(--greyText)`}>
            <span className="material-symbols-outlined pr-5">edit</span>
          </button>
          <button onClick={() => deleteClick()} className={`text-(--greyText)`}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden ${last ? "rounded-b-[20px]" : ""} md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] relative w-full h-auto bg-(--card) border border-white/10 text-white py-3 px-5 rounded-none`}
      >
        <div className={`w-full flex items-center capitalize`}>
          {transaction.name}
        </div>
        <div className={`w-full flex items-center capitalize`}>
          {transaction.category}
        </div>
        <div className={`w-full flex items-center`}>
          {transaction.date.split("T")[0]}
        </div>
        <div className={`w-full flex items-center`}>{transaction.amount}</div>
        <div className="w-full flex justify-end items-center">
          <button onClick={() => handleClick()} className={`text-(--greyText)`}>
            <span className="material-symbols-outlined pr-5 text-[1.2rem]!">
              edit
            </span>
          </button>
          <button onClick={() => deleteClick()} className={`text-(--greyText)`}>
            <span className="material-symbols-outlined text-[1.2rem]!">
              delete
            </span>
          </button>
        </div>
      </div>
      <AddTransaction
        handleClick={handleClick}
        active={active}
        existingTransaction={transaction}
      ></AddTransaction>
    </>
  );
};

export default TransactionCard;

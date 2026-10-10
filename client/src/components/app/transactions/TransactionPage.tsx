import AddTransaction from "../shared/AddTransaction";
import { useState } from "react";
import TransactionList from "./TransactionList";
import type { Transaction } from "../../../models/Transaction";
// import { getTransactions } from "../../../services/transactionApi";
import { useTransactionStore } from "../../../stores/TransactionStore";

const TransactionPage = () => {
  const [active, setActive] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [chosenCategory, setChosenCategory] = useState<string>("all");
  const [chosenType, setChosenType] = useState<string>("all");
  const transactions = useTransactionStore((s) => s.transactions);

  const filteredTransactions: Transaction[] = transactions
    .filter((transaction) =>
      transaction.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter(
      (transaction) =>
        transaction.category === chosenCategory || chosenCategory === "all",
    )
    .filter(
      (transaction) => transaction.type === chosenType || chosenType === "all",
    );

  const handleClick = () => {
    setActive((p) => !p);
  };

  return (
    <>
      <div
        className={`w-full h-auto bg-(--primary) relative flex flex-col md:flex-row md:items-center p-5 z-20`}
      >
        <input
          className={`bg-white/10 border border-white/10 rounded-[5px] px-3 py-1 mb-2 text-white/60 md:w-[50%] md:mr-3 md:flex md:items-center md:m-0`}
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name=""
          id=""
          className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 text-white mb-2 md:w-35 md:mr-3 md:flex md:items-center md:m-0`}
          value={chosenCategory}
          onChange={(e) => setChosenCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="shopping">Shopping</option>
          <option value="dining">Dining</option>
          <option value="bills">Bills</option>
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="other">Other</option>
        </select>

        <select
          name=""
          id=""
          className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 text-white mb-2 md:w-35 md:mr-3 md:flex md:items-center md:m-0`}
          value={chosenType}
          onChange={(e) => setChosenType(e.target.value)}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          onClick={handleClick}
          className={`cursor-pointer bg-(--purple) flex items-center justify-start md:justify-center p-2 rounded-full text-white md:w-25 md:self-end md:ml-auto`}
        >
          <span className="material-symbols-outlined text-[1.1rem]! mr-2">
            add
          </span>
          Add
        </button>
      </div>
      <AddTransaction
        active={active}
        handleClick={handleClick}
      ></AddTransaction>

      <TransactionList transactionList={filteredTransactions}></TransactionList>
    </>
  );
};

export default TransactionPage;

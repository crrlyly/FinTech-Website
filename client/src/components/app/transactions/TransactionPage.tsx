import AddTransaction from "../shared/AddTransaction";
import { useState } from "react";
import TransactionList from "./TransactionList";

const dummyTransactions: dummyTransactionsProps[] = [
  {
    name: "Electricity Bill",
    category: "bills",
    type: "expense",
  },
  {
    name: "Concert Tickets",
    category: "entertainment",
    type: "expense",
  },
  {
    name: "Design Project",
    category: "freelance",
    type: "income",
  },
];

export interface dummyTransactionsProps {
  name: string;
  category:
    | "all"
    | "groceries"
    | "entertainment"
    | "transportation"
    | "shopping"
    | "dining"
    | "bills"
    | "salary"
    | "freelance"
    | "other";
  type: "expense" | "income";
}

const TransactionPage = () => {
  const [active, setActive] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [chosenCategory, setChosenCategory] = useState<string>("all");
  const [chosenType, setChosenType] = useState<string>("all");

  // TODO: Connect with database to get list of transactions
  const [transactions, setTransactions] =
    useState<dummyTransactionsProps[]>(dummyTransactions);

  const filteredTransactions: dummyTransactionsProps[] = transactions
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
        className={`w-full h-auto bg-yellow-200 relative flex flex-col px-3 py-5 z-20`}
      >
        <input
          type="text"
          placeholder="Search transactions..."
          className={`bg-blue-200`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name=""
          id=""
          className={`bg-blue-200`}
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
          className={`bg-blue-200`}
          value={chosenType}
          onChange={(e) => setChosenType(e.target.value)}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={handleClick} className={`bg-pink-200`}>
          <span className="material-symbols-outlined">add</span>
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

import { useState } from "react";
import AddTransaction from "../shared/AddTransaction";
import type { Transaction } from "../../../models/Transaction";
import { getTransactions } from "../../../services/transactionApi";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  console.log(transactions);

  async function loadTransactions() {
    try {
      const { transactions } = await getTransactions();
      setTransactions(transactions);
      console.log(transactions);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick() {
    setActive((p) => !p);
  }

  return (
    <>
      <div
        className={`w-full h-auto bg-(--primary) relative flex flex-col md:flex-row md:items-center md:justify-between p-5 z-20`}
      >
        <span className={`text-(--greyText) md:text-[1.2rem]`}>
          Welcome back. Here's your financial overview.
        </span>
        <button
          onClick={() => handleClick()}
          className={`text-white bg-(--purple) flex mt-3 rounded-full p-2 md:mt-0 md:px-5`}
        >
          <span className="material-symbols-outlined">add</span>
          Add transaction
        </button>
      </div>
      <AddTransaction
        active={active}
        handleClick={handleClick}
        loadTransactions={loadTransactions}
      ></AddTransaction>
    </>
  );
};

export default Header;

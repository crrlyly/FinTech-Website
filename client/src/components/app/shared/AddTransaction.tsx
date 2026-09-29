import { useState } from "react";
import type { TransactionFormData } from "../../../models/Transaction";
import type { Transaction } from "../../../models/Transaction";
import { addTransaction } from "../../../services/transactionApi";
import { updateTransaction } from "../../../services/transactionApi";

type AddTransactionProps = {
  active: boolean;
  handleClick: () => void;
  existingTransaction?: Transaction;
  loadTransactions: () => Promise<void>;
};

const AddTransaction = ({
  active,
  handleClick,
  existingTransaction,
  loadTransactions,
}: AddTransactionProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    tid: existingTransaction ? Number(existingTransaction.tid) : undefined,
    type: existingTransaction ? existingTransaction.type : "expense",
    amount: existingTransaction ? existingTransaction.amount.toString() : "",
    category: existingTransaction ? existingTransaction.category : "groceries",
    date: existingTransaction ? existingTransaction.date.split("T")[0] : "",
    name: existingTransaction ? existingTransaction.name : "",
  });

  const [type, setType] = useState(
    existingTransaction ? existingTransaction.type : "expense",
  );

  function changeType(typeChange: "expense" | "income") {
    setType(typeChange);
    setFormData((p) => ({ ...p, type: typeChange }));
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res: Transaction;
      if (existingTransaction) {
        res = await updateTransaction(formData);
      } else {
        res = await addTransaction(formData);
      }

      console.log("Response:", res);
      if (loadTransactions) {
        await loadTransactions();
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Object: ", formData);
  };

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 left-0 bg-pink-200 justify-center items-center `}
    >
      <div className={`w-full h-auto bg-blue-200 m-5`}>
        <div
          className={`w-full h-auto flex items-center justify-between p-5 text-2xl`}
        >
          Add Transaction
          <button onClick={() => handleClick()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          className={`w-full h-full bg-(--purple)`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div
            className={`w-full h-auto flex items-center justify-center px-5`}
          >
            <button
              type="button"
              onClick={() => changeType("expense")}
              className={`${type === "expense" ? "bg-purple-500" : "bg-purple-200"} w-[50%] mr-3 p-2 rounded-2xl`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => changeType("income")}
              className={`${type === "income" ? "bg-purple-500" : "bg-purple-200"} w-[50%] p-2 rounded-2xl`}
            >
              Income
            </button>
          </div>

          <div className={`flex flex-col m-5`}>
            <label htmlFor="">Amount</label>
            <input
              className={`bg-pink-200`}
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData((p) => ({ ...p, amount: e.target.value }))
              }
            />
          </div>

          <div className={`flex flex-col m-5`}>
            <label htmlFor="">Category</label>
            <select
              className={`bg-pink-200`}
              name=""
              id=""
              value={formData.category}
              onChange={(e) =>
                setFormData((p) => ({ ...p, category: e.target.value }))
              }
            >
              <option value="groceries">Groceries</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="dining">Dining</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={`flex flex-col m-5`}>
            <label htmlFor="date">Date</label>
            <input
              className={`bg-pink-200`}
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((p) => ({ ...p, date: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col m-5`}>
            <label htmlFor="">Name</label>
            <input
              className={`bg-pink-200`}
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col`}>
            <button className={`bg-yellow-200 mb-10 mx-5`} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;

import { useEffect, useState } from "react";
import type { TransactionFormData } from "../../../models/Transaction";
import type { Transaction } from "../../../models/Transaction";
import { useTransactionStore } from "../../../stores/TransactionStore";

type AddTransactionProps = {
  active: boolean;
  handleClick: () => void;
  existingTransaction?: Transaction;
};

const AddTransaction = ({
  active,
  handleClick,
  existingTransaction,
}: AddTransactionProps) => {
  const addTransaction = useTransactionStore((s) => s.addStoreTransactions);
  const updateTransaction = useTransactionStore(
    (s) => s.updateStoreTransaction,
  );

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
      if (existingTransaction) {
        await updateTransaction(formData);
      } else {
        await addTransaction(formData);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Object: ", formData);
  };

  useEffect(() => {
    if (active) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 left-0 bg-(--primary)/30
    backdrop-blur-sm justify-center items-center `}
    >
      <div
        className={`w-full h-auto bg-(--card)/60 backdrop-blur-sm m-5 border border-white/10 rounded-[20px] text-white max-w-120`}
      >
        <div
          className={`w-full h-auto flex items-center justify-between p-5 text-[1.2rem] font-bold`}
        >
          Add Transaction
          <button onClick={() => handleClick()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className={`w-full h-full `} onSubmit={(e) => handleSubmit(e)}>
          <div
            className={`w-full h-auto flex items-center justify-center px-5`}
          >
            <button
              type="button"
              onClick={() => changeType("expense")}
              className={`${type === "expense" ? "bg-purple-500 text-white" : "bg-white/10 text-(--greyText)"} w-[50%] mr-3 p-2 rounded-2xl`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => changeType("income")}
              className={`${type === "income" ? "bg-purple-500 text-white" : "bg-white/10 text-(--greyText)"} w-[50%] p-2 rounded-2xl`}
            >
              Income
            </button>
          </div>

          <div className={`flex flex-col m-5`}>
            <label htmlFor="">Amount</label>
            <input
              className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
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
              className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
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
              className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
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
              className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col`}>
            <button
              className={`p-2 bg-(--purple) rounded-2xl mb-10 mx-5`}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;

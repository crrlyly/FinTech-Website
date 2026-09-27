import { useState } from "react";
import type { TransactionFormData } from "../../../models/Transaction";

type AddTransactionProps = {
  active: boolean;
  handleClick: () => void;
};

const AddTransaction = ({ active, handleClick }: AddTransactionProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    type: "expense",
    amount: "",
    category: "groceries",
    date: "",
    description: "",
  });

  const [type, setType] = useState("expense");

  function changeType(typeChange: "expense" | "income") {
    setType(typeChange);
    setFormData((p) => ({ ...p, type: typeChange }));
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Object: ", formData);
  };

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 bg-pink-200 justify-center items-center `}
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
          className={`w-full h-full bg-green-200`}
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
              type="text"
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
            <label htmlFor="">Description</label>
            <input
              className={`bg-pink-200`}
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
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

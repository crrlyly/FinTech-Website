import { useState } from "react";
import type { Budget } from "../../../models/Budget";
import { updateBudgets } from "../../../services/budgetApi";

type EditBudgetProps = {
  active: boolean;
  handleClick: () => void;
  budget: Budget;
  loadBudgets: () => void;
};

const EditBudget = ({
  active,
  handleClick,
  budget,
  loadBudgets,
}: EditBudgetProps) => {
  const [monthlyLimit, setMonthlyLimit] = useState<string>(
    budget.maxAmount.toString(),
  );
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { result, message: res } = await updateBudgets({
        bid: budget.bid,
        maxAmount: monthlyLimit,
        category: budget.category,
      });
      loadBudgets();
      console.log(res);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 left-0 bg-pink-200 justify-center items-center `}
    >
      <div className={`w-full h-auto bg-blue-200 m-5`}>
        <div className={`flex justify-between items-center`}>
          Edit Budget
          <button onClick={() => handleClick()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`flex flex-col`}>
            <label htmlFor="">Monthly Limit</label>
            <input
              type="number"
              className={`bg-green-200`}
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;

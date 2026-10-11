import { useEffect, useState } from "react";
import type { Budget } from "../../../models/Budget";
import { useBudgetStore } from "../../../stores/BudgetStore";

type EditBudgetProps = {
  active: boolean;
  handleClick: () => void;
  budget: Budget;
};

const EditBudget = ({ active, handleClick, budget }: EditBudgetProps) => {
  const updateBudget = useBudgetStore((s) => s.updateStoreBudgets);
  const [monthlyLimit, setMonthlyLimit] = useState<string>(
    budget.maxAmount.toString(),
  );

  const [errors, setErrors] = useState<{ limit?: string }>({});

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

  function validateForm() {
    const newError: { limit?: string } = {};

    if (!monthlyLimit.trim()) {
      newError.limit = "Must enter a monthly limit of 0 or greater.";
    } else if (
      !Number.isFinite(Number(monthlyLimit)) || //prevents NaN or infinity
      Number(monthlyLimit) < 0
    ) {
      newError.limit = "Limit must be 0 or greater. Please try again.";
    }

    setErrors(newError);

    return Object.keys(newError).length === 0;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await updateBudget({
        bid: budget.bid,
        maxAmount: monthlyLimit,
        category: budget.category,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 left-0 bg-(--primary)/30 backdrop-blur-sm justify-center items-center `}
    >
      <div
        className={`w-full h-auto bg-(--card)/60 backdrop-blur-sm m-5 border border-white/10 rounded-[20px] p-5 text-white lg:max-w-100`}
      >
        <div
          className={`flex justify-between items-center font-bold text-[1.2rem] mb-3`}
        >
          Edit Budget
          <button className={`cursor-pointer`} onClick={() => handleClick()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="" className={`mb-2`}>
              Monthly Limit
            </label>
            <input
              className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
            />
            {errors.limit && <p className={`text-red-500`}>{errors.limit}</p>}
          </div>
          <button
            className={`bg-(--purple) cursor-pointer w-full p-2 rounded-[10px]`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBudget;

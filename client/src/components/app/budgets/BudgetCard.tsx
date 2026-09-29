import Ratio from "../shared/Ratio";
import type { Budget } from "../../../models/Budget";
// import { updateBudgets } from "../../../services/budgetApi";
import EditBudget from "./EditBudget";
import { useState } from "react";

type BudgetCardProps = {
  budget: Budget;
  usedMoney: number;
  loadBudgets: () => void;
};
const BudgetCard = ({ budget, usedMoney, loadBudgets }: BudgetCardProps) => {
  const [editActive, setEditActive] = useState<boolean>(false);

  const percent = Number(budget.maxAmount) === 0 ? 0 : usedMoney/Number(budget.maxAmount)*100;

  function handleClick() {
    setEditActive((p) => !p);
    console.log(budget);
  }

  return (
    <>
      <div className={`w-full min-h-45 h-auto bg-blue-200 p-8`}>
        <div className={`flex justify-between text-2xl`}>
          {budget.category}
          <div className={``}>
            <button onClick={handleClick} className={`mr-5 p-1`}>
              <span className="material-symbols-outlined">edit</span>
            </button>
            {/* <button className={`p-1`}>
              <span className="material-symbols-outlined">delete</span>
            </button> */}
          </div>
        </div>

        <Ratio usedMoney={usedMoney} budget={budget} percent={percent}></Ratio>

        <div className={`mt-2 text-[1rem]`}>{percent}% used</div>
      </div>
      <EditBudget
        active={editActive}
        handleClick={handleClick}
        budget={budget}
        loadBudgets={loadBudgets}
      ></EditBudget>
    </>
  );
};

export default BudgetCard;

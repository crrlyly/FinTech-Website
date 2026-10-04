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

  const percent =
    Number(budget.maxAmount) < usedMoney
      ? 100
      : Number(budget.maxAmount) === 0
        ? 0
        : (usedMoney / Number(budget.maxAmount)) * 100;

  function handleClick() {
    setEditActive((p) => !p);
  }

  return (
    <>
      <div
        className={`w-full min-h-45 h-auto bg-(--card) p-8 border border-white/10 rounded-[15px] text-white`}
      >
        <div className={`flex justify-between text-[1.2rem] font-bold`}>
          {budget.category}
          <div className={``}>
            <button onClick={handleClick} className={`mr-5 p-1`}>
              <span className="material-symbols-outlined text-[1.2rem]! text-(--greyText)">
                edit
              </span>
            </button>
          </div>
        </div>

        <Ratio usedMoney={usedMoney} budget={budget} percent={percent}></Ratio>

        <div className={`mt-2 text-[1rem]`}>{percent.toFixed(2)}% used</div>
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

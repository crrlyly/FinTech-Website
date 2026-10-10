import Ratio from "../shared/Ratio";
import type { Budget } from "../../../models/Budget";
import EditBudget from "./EditBudget";
import { useState } from "react";
import { useBudgetStore } from "../../../stores/BudgetStore";

type BudgetCardProps = {
  budget: Budget;
  usedMoney: number;
};
const BudgetCard = ({ budget, usedMoney }: BudgetCardProps) => {
  const [editActive, setEditActive] = useState<boolean>(false);

  const selectedMonthIndex = useBudgetStore((s) => s.selectedMonthIndex);

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
          <div>
            <button
              onClick={handleClick}
              className={`cursor-pointer mr-5 p-1 ${selectedMonthIndex != 0 ? "hidden" : "block"}`}
            >
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
      ></EditBudget>
    </>
  );
};

export default BudgetCard;

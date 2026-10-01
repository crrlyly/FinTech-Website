import type { ActivateBudgetProps } from "../../../pages/app/Budgets";
import AutoActivate from "./AutoActivate";

const BudgetHeader = ({ activateBudget, handleClick }: ActivateBudgetProps) => {
  return (
    <div
      className={`${activateBudget ? "flex" : "hidden"} flex-col w-full h-auto bg-(--primary) items-center p-5`}
    >
      <div className={`w-full h-auto flex justify-between items-center mb-6`}>
        <span className={`text-(--greyText)`}>
          Monthly budgets for September 2026{" "}
        </span>
        <button
          onClick={handleClick}
          className={`w-auto h-auto p-3 rounded-full bg-(--purple) text-white font-bold`}
        >
          Disable Budget
        </button>
      </div>
      <AutoActivate></AutoActivate>
     
    </div>
  );
};

export default BudgetHeader;

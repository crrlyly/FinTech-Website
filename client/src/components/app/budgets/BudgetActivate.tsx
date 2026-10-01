import type { ActivateBudgetProps } from "../../../pages/app/Budgets";
import AutoActivate from "./AutoActivate";

const BudgetActivate = ({
  activateBudget,
  handleClick,
}: ActivateBudgetProps) => {
  return (
    <div
      className={`${activateBudget ? "hidden" : "block"} w-full h-auto bg-(--primary) flex-1 p-5`}
    >
      <AutoActivate></AutoActivate>

      <div
        className={`w-full h-auto bg-(--card) border border-white/10 rounded-[20px] p-7 flex flex-col items-center justify-center text-white mt-5`}
      >
        <div
          className={`bg-white/10 p-3 flex justify-center items-center rounded-full mb-5`}
        >
          <span className="material-symbols-outlined text-[1.2rem]! text-(--purple)">
            mode_off_on
          </span>
        </div>
        <div className={`mb-3 text-[1.2rem] font-bold`}>
          Budget for September 2026
        </div>
        <p className={`text-center text-(--greyText) mb-5`}>
          Activate to create a budget for every spending category at once. Then
          just set a monthly limit for each — no duplicates, no guesswork. Skip
          any month you don't want to budget.
        </p>
        <button
          onClick={handleClick}
          className={`w-full p-2 bg-(--purple) rounded-full flex justify-center items-center mb-3`}
        >
          <span className="material-symbols-outlined mr-2">mode_off_on</span>
          Activate budget
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default BudgetActivate;

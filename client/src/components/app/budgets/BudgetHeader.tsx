import { useMemo } from "react";
import { useUser } from "../../../context/UserContext";
import { useBudgetStore } from "../../../stores/BudgetStore";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";
import AutoActivate from "./AutoActivate";
import { getPast4MonthsBudget } from "../../../helpers/budgetHelper";

const BudgetHeader = () => {
  const { user } = useUser();
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const toggleActivateBudgets = useBudgetUIStore(
    (s) => s.toggleActivateBudgets,
  );
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  const allBudgets = useBudgetStore((s) => s.allBudgets);
  const past4Months = useMemo(
    () => getPast4MonthsBudget(allBudgets),
    [allBudgets],
  );
  const selectedMonthIndex = useBudgetStore((s) => s.selectedMonthIndex);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "flex" : "hidden";
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(past4Months);
  return (
    <div
      className={`${isEveryMonthOn()} flex-col w-full h-auto bg-(--primary) items-center p-5`}
    >
      <div className={`w-full h-auto flex justify-between items-center mb-6`}>
        <span className={`text-(--greyText)`}>
          Monthly budgets for{" "}
          {`${months[past4Months[selectedMonthIndex].month]} ${past4Months[selectedMonthIndex].year}`}
        </span>
        <button
          onClick={() => toggleActivateBudgets(user)}
          className={`cursor-pointer w-auto h-auto p-3 rounded-full bg-(--purple) text-white font-bold`}
        >
          Disable Budget
        </button>
      </div>
      <AutoActivate></AutoActivate>
    </div>
  );
};

export default BudgetHeader;

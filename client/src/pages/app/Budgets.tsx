import TopNav from "../../components/app/shared/TopNav";
import BudgetHeader from "../../components/app/budgets/BudgetHeader";
import BudgetStats from "../../components/app/budgets/BudgetStats";
import Tip from "../../components/app/shared/Tip";
import BudgetList from "../../components/app/budgets/BudgetList";
import BudgetActivate from "../../components/app/budgets/BudgetActivate";
import { useBudgetUIStore } from "../../stores/BudgetUIStore";
import { useUser } from "../../context/UserContext";
import { useEffect, useMemo } from "react";
import { useBudgetStore } from "../../stores/BudgetStore";
import { getPast4MonthsBudget } from "../../helpers/budgetHelper";

const Budgets = () => {
  const { user } = useUser();
  const loadInitialValues = useBudgetUIStore((s) => s.loadInitialValues);
  const loadBudgets = useBudgetStore((s) => s.loadBudgets);
  const setSelectedMonthIndex = useBudgetStore((s) => s.setSelectedMonthIndex);
  const selectedMonthIndex = useBudgetStore((s) => s.selectedMonthIndex);
  useEffect(() => {
    loadInitialValues(user);
  }, [user, loadInitialValues]);

  useEffect(() => {
    if (user) {
      loadBudgets();
    }
  }, [user?.id, loadBudgets]);

  const allBudgets = useBudgetStore((s) => s.allBudgets);
  const past4Months = useMemo(
    () => getPast4MonthsBudget(allBudgets),
    [allBudgets],
  );

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

  return (
    <div
      className={` w-full min-h-dvh pt-20 lg:pt-18 lg:w-[calc(100%-17.5rem)] relative flex flex-col items-center lg:ml-70 lg:px-5 bg-(--primary)`}
    >
      <TopNav title="Budgets"></TopNav>
      <div
        className={`w-[calc(100%-2.5rem)] mt-5 rounded-[20px] border border-white/10 h-auto min-h-20 bg-(--card) grid grid-cols-3 text-(--greyText) px-5 py-2`}
      >
        <button
          onClick={() =>
            setSelectedMonthIndex(Math.min(selectedMonthIndex + 1, 3))
          }
          disabled={selectedMonthIndex === 3}
          className={`cursor-pointer p-2 text-white flex items-center justify-start`}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <div
          className={`font-bold flex flex-col justify-center items-center text-[1.2rem] text-white text-center`}
        >
          {`${months[past4Months[selectedMonthIndex].month]} ${past4Months[selectedMonthIndex].year}`}
          <span
            className={`${selectedMonthIndex === 0 ? "block" : "hidden"} font-normal text-[.9rem] text-(--greyText)`}
          >
            Current month
          </span>
        </div>
        <button
          onClick={() =>
            setSelectedMonthIndex(Math.max(selectedMonthIndex - 1, 0))
          }
          disabled={selectedMonthIndex === 0}
          className={`cursor-pointer p-2 text-white flex items-center justify-end`}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <BudgetActivate></BudgetActivate>
      <BudgetHeader></BudgetHeader>
      <BudgetStats></BudgetStats>
      <Tip tipString="Tip: a common guideline is 50% needs, 30% wants, 20% savings. Your category limits should add up to less than your monthly income — the unallocated amount is your buffer."></Tip>
      <BudgetList></BudgetList>
    </div>
  );
};

export default Budgets;

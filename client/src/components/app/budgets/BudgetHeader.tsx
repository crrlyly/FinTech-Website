import { useUser } from "../../../context/UserContext";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";
import AutoActivate from "./AutoActivate";

const BudgetHeader = () => {
  const { user } = useUser();
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const setActivateBudget = useBudgetUIStore((s) => s.setActivateBudgets);
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "flex" : "hidden";
  }

  return (
    <div
      className={`${isEveryMonthOn()} flex-col w-full h-auto bg-(--primary) items-center p-5`}
    >
      <div className={`w-full h-auto flex justify-between items-center mb-6`}>
        <span className={`text-(--greyText)`}>
          Monthly budgets for September 2026{" "}
        </span>
        <button
          onClick={() => setActivateBudget(user)}
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

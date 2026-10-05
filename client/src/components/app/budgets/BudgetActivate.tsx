import { useUser } from "../../../context/UserContext";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";

const BudgetActivate = () => {
  const { user } = useUser();
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const setActivateBudget = useBudgetUIStore((s) => s.setActivateBudgets);
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "hidden" : "block";
  }
  return (
    <div
      className={`${isEveryMonthOn()} w-full h-auto bg-(--primary) flex-1 p-5`}
    >
      <div
        className={`flex justify-start items-center text-white h-auto my-5 lg:text-[1.2rem]`}
      >
        No budgets set for October 2026.
      </div>

      <div
        className={`w-full h-auto bg-(--card) border border-white/10 rounded-[20px] p-7 flex flex-col items-center justify-center text-white mt-5 lg:min-h-100`}
      >
        <div
          className={`bg-(--purple)/10 p-3 flex justify-center items-center rounded-full mb-5 `}
        >
          <span className="material-symbols-outlined text-[1.2rem]! text-(--purple) lg:text-[1.7rem]!">
            mode_off_on
          </span>
        </div>
        <div className={`mb-3 text-[1.2rem] font-bold lg:text-[1.5rem]!`}>
          Budget for September 2026
        </div>
        <p
          className={`text-center text-(--greyText) mb-5 lg:max-w-100 lg:text-[1.1rem]`}
        >
          Activate to create a budget for every spending category at once. Then
          just set a monthly limit for each — no duplicates, no guesswork. Skip
          any month you don't want to budget.
        </p>
        <button
          onClick={() => setActivateBudget(user)}
          className={`w-full p-2 bg-(--purple) rounded-full flex justify-center items-center mb-3 lg:max-w-50 lg:text-[1.2rem] cursor-pointer`}
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

import { useUser } from "../../../context/UserContext";
import { useBudgetUIStore } from "../../../stores/BudgetUIStore";

const AutoActivate = () => {
  const { user } = useUser();
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const activateEveryMonth = useBudgetUIStore((s) => s.activateEveryMonth);
  const toggleActivateEveryMonthFromUser = useBudgetUIStore(
    (s) => s.toggleActivateEveryMonthFromUser,
  );

  function isEveryMonthOn() {
    return activateEveryMonth || activateBudget ? "flex" : "hidden";
  }

  console.log(activateEveryMonth);
  return (
    <div
      className={`${isEveryMonthOn()} w-full h-auto bg-(--card) border border-white/10 rounded-[20px] px-5 py-3 justify-between items-center`}
    >
      <div className={`w-[70%] flex flex-col text-white`}>
        <div className={`font-bold`}>Auto-activate every month</div>
        <span className={`text-[.9rem] text-(--greyText)`}>
          Automatically create budgets for each new month.
        </span>
      </div>
      <button
        onClick={() => toggleActivateEveryMonthFromUser(user)}
        className={`cursor-pointer ${activateEveryMonth ? "bg-(--purple)" : "bg-(--primary)"} w-13 h-6 rounded-full relative border border-white/10`}
      >
        <div
          className={`${activateEveryMonth ? "right-0 top-0" : "left-0 top-0"} transition-all duration-300 bg-white rounded-full w-[50%] h-full absolute`}
        ></div>
      </button>
    </div>
  );
};

export default AutoActivate;

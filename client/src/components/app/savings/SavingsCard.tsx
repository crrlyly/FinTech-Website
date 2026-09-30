import Ratio from "../shared/Ratio";
import type { Goal } from "../../../models/Goal";
import { deleteGoal } from "../../../services/goalApi";
import AddFunds from "./AddFunds";
import { useState } from "react";

type SavingsCardProps = {
  loadGoals: () => Promise<void>;
  goal: Goal;
};

const SavingsCard = ({ goal, loadGoals }: SavingsCardProps) => {
  const percent = (goal.currAmount / goal.goalAmount) * 100;

  const [active, setActive] = useState<boolean>(false);

  function handleClick() {
    setActive((p) => !p);
  }

  async function handleDelete() {
    try {
      const { message } = await deleteGoal(goal.gid);
      loadGoals();
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className={`w-full min-h-60 h-auto bg-(--card) border border-white/10 rounded-[15px] p-5 text-white`}
      >
        <div className={`flex justify-between items-center mb-5`}>
          <div className={`flex items-center text-[1.1rem] font-bold`}>
            <span className="material-symbols-outlined text-(--purple) bg-(--purple)/20 p-2 rounded-[10px] text-[1.1rem]! mr-2">
              cyclone
            </span>
            {goal.name}
          </div>
          <button onClick={handleDelete}>
            <span className="material-symbols-outlined text-[1.1rem]! text-(--greyText)">
              delete
            </span>
          </button>
        </div>
        <Ratio
          usedMoney={goal.currAmount}
          goal={goal}
          percent={percent}
        ></Ratio>
        <div className={`mt-3 text-(--greyText)`}>
          {percent.toFixed(0)}% saved · $
          {(goal.goalAmount - goal.currAmount).toFixed(2)} to go
        </div>
        <div className={`mb-3`}>Save $1,050.00/mo to hit 2026-12-15</div>
        <button
          onClick={handleClick}
          className={`w-full bg-white/10 rounded-2xl p-2 hover:bg-white/20 duration-100 `}
        >
          Add Funds
        </button>
      </div>
      <AddFunds
        active={active}
        handleClick={handleClick}
        goal={goal}
        loadGoals={loadGoals}
      ></AddFunds>
    </>
  );
};

export default SavingsCard;

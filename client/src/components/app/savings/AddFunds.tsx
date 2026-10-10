import { useEffect, useState } from "react";
import type { Goal } from "../../../models/Goal";
import { useGoalStore } from "../../../stores/GoalStore";

type AddFundsProps = {
  active: boolean;
  handleClick: () => void;
  goal: Goal;
};

const AddFunds = ({ active, handleClick, goal }: AddFundsProps) => {
  const updateGoal = useGoalStore((s) => s.updateStoreGoals);
  const [newGoal, setNewGoal] = useState<string>("");

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      updateGoal({
        ...goal,
        currAmount: Number(goal.currAmount) + Number(newGoal),
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (active) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 left-0 bg-(--primary)/30 backdrop-blur-sm justify-center items-center`}
    >
      <div
        className={`w-full h-auto m-5 flex flex-col p-5 border border-white/10 bg-(--card)/60 backdrop-blur-sm rounded-[15px] lg:max-w-120`}
      >
        <div
          className={`flex justify-between text-white text-[1.2rem] font-bold mb-3`}
        >
          Add Funds to test{" "}
          <button className={`cursor-pointer`} onClick={() => handleClick()}>
            <span className="material-symbols-outlined text-(--greyText)">
              close
            </span>
          </button>
        </div>
        <form onSubmit={onSubmit} className={`flex flex-col`}>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="">Amount to add</label>
            <input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              type="number"
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 lg:mb-5`}
            />
          </div>
          <button
            type="submit"
            className={`bg-(--purple) cursor-pointer w-full p-2 rounded-[10px] text-white`}
          >
            Add funds
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFunds;

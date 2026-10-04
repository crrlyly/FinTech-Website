import { useEffect, useState } from "react";
import type { GoalFormData } from "../../../models/Goal";
import { addGoal } from "../../../services/goalApi";

type AddSavingsProps = {
  active: boolean;
  handleClick: () => void;
  loadGoals: () => Promise<void>;
};

const AddSavings = ({ active, handleClick, loadGoals }: AddSavingsProps) => {
  const [formData, setFormData] = useState<GoalFormData>({
    name: "",
    targetDate: "",
    goalAmount: "",
    currAmount: "",
  });

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { gid, message } = await addGoal(formData);
      loadGoals();
      console.log(gid, message);
    } catch (error) {
      console.error(error);
    }
  };

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
      className={`${active ? "flex" : "hidden"} z-100 w-full h-full fixed top-0 left-0 bg-(--primary)/30 backdrop-blur-sm justify-center items-center`}
    >
      <div
        className={`w-full h-auto border border-white/10 rounded-[20px] text-white bg-(--card)/60 backdrop-blur-sm m-5 p-7 lg:max-w-130`}
      >
        <div className={`flex items-center justify-between text-2xl mb-5`}>
          New Savings Goal
          <button onClick={handleClick}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={submit}>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="" className={`text-(--greyText)`}>
              Goal Name
            </label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div className={`flex gap-3 mb-5`}>
            <div className={`flex-1 min-w-0`}>
              <label htmlFor="" className={`text-(--greyText)`}>
                Target Amount
              </label>
              <input
                className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
                placeholder="0"
                type="number"
                value={formData.goalAmount}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    goalAmount: e.target.value,
                  }))
                }
              />
            </div>
            <div className={`flex-1 min-w-0`}>
              <label htmlFor=" " className={`text-(--greyText)`}>
                Saved So Far
              </label>
              <input
                className={`w-full bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
                placeholder="0"
                type="number"
                value={formData.currAmount}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, currAmount: e.target.value }))
                }
              />
            </div>
          </div>
          <div className={`flex flex-col mb-5 lg:mb-10`}>
            <label htmlFor="" className={`text-(--greyText)`}>
              Target Date (optional)
            </label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
              type="date"
              value={formData.targetDate}
              onChange={(e) =>
                setFormData((p) => ({ ...p, targetDate: e.target.value }))
              }
            />
          </div>
          <button
            className={`bg-(--purple) w-full p-2 rounded-2xl mb-3`}
            type="submit"
          >
            Create goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSavings;

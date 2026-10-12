import { useEffect, useState } from "react";
import type { GoalFormData } from "../../../models/Goal";
import { useGoalStore } from "../../../stores/GoalStore";

type AddSavingsProps = {
  active: boolean;
  handleClick: () => void;
};

const AddSavings = ({ active, handleClick }: AddSavingsProps) => {
  const addGoal = useGoalStore((s) => s.addStoreGoals);
  const [formData, setFormData] = useState<GoalFormData>({
    name: "",
    targetDate: "",
    goalAmount: "",
    currAmount: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    targetDate?: string;
    goalAmount?: string;
    currAmount?: string;
  }>({});

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

  function validateForm(): boolean {
    const newErrors: {
      name?: string;
      targetDate?: string;
      goalAmount?: string;
      currAmount?: string;
    } = {};

    // Errors for name
    if (!formData.name.trim()) {
      newErrors.name =
        "Must add a name for your savings goal. Please try again.";
    }

    // Errors for target date

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const chosenDate = new Date(`${formData.targetDate}T00:00:00`);

    if (!formData.targetDate) {
      newErrors.targetDate = "Must choose a target date.";
    } else if (Number.isNaN(chosenDate.getTime())) {
      newErrors.targetDate = "Please enter a valid date.";
    } else if (chosenDate < today) {
      newErrors.targetDate = "Cannot choose past dates. Please try again.";
    }

    // Errors for target amount

    if (!formData.goalAmount.trim()) {
      newErrors.goalAmount =
        "Must add a savings goal amount. Please try again.";
    } else if (
      Number(formData.goalAmount) <= 0 ||
      !Number.isFinite(Number(formData.goalAmount))
    ) {
      newErrors.goalAmount =
        "Target amount must be a valid positive number. Please try again.";
    }

    // Errors for currAmount
    if (!formData.currAmount.trim()) {
      newErrors.currAmount = "Amount saved must be 0+. Please try again.";
    } else if (
      Number(formData.currAmount) < 0 ||
      !Number.isFinite(Number(formData.currAmount))
    ) {
      newErrors.currAmount =
        "Saved amount must be a valid positive number. Please try again.";
    } else if (Number(formData.goalAmount) < Number(formData.currAmount)) {
      newErrors.currAmount =
        "Starting saved amount cannot be greater than the target amount. Please try again.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      addGoal(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-100 w-full h-full fixed top-0 left-0 bg-(--primary)/30 backdrop-blur-sm justify-center items-center`}
    >
      <div
        className={`w-full h-auto border border-white/10 rounded-[20px] text-white bg-(--card)/60 backdrop-blur-sm m-5 p-7 lg:max-w-130`}
      >
        <div className={`flex items-center justify-between text-2xl mb-5`}>
          New Savings Goal
          <button className={`cursor-pointer`} onClick={handleClick}>
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
            {errors.name && <p className={`text-red-500`}>{errors.name}</p>}
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
              {errors.goalAmount && (
                <p className={`text-red-500`}>{errors.goalAmount}</p>
              )}
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
              {errors.currAmount && (
                <p className={`text-red-500`}>{errors.currAmount}</p>
              )}
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
            {errors.targetDate && (
              <p className={`text-red-500`}>{errors.targetDate}</p>
            )}
          </div>
          <button
            className={`bg-(--purple) cursor-pointer w-full p-2 rounded-2xl mb-3`}
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

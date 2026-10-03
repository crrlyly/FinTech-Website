import type { Budget } from "../../../models/Budget";
import type { Goal } from "../../../models/Goal";

type RatioProps = {
  usedMoney: number;
  budget?: Budget;
  goal?: Goal;
  percent: number;
};

const Ratio = ({ usedMoney, budget, goal, percent }: RatioProps) => {
  return (
    <>
      <div className={`flex justify-between items-center mt-5 text-[1.2rem]`}>
        <span>${Number(usedMoney).toFixed(2)}</span>
        <span className={`text-(--greyText)`}>
          of ${budget ? budget.maxAmount : goal?.goalAmount}
        </span>
      </div>

      <div className={`w-full h-4 bg-(--purple)/20 rounded-full relative mt-2`}>
        <div
          style={{ width: `${percent}%` }}
          className={`${percent === 100 ? "bg-red-500" : "bg-(--purple)"} absolute top-0 left-0  h-full  rounded-full`}
        ></div>
      </div>
    </>
  );
};

export default Ratio;

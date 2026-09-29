import type { Budget } from "../../../models/Budget";

type RatioProps = {
  usedMoney: number;
  budget: Budget;
  percent: number;
};

const Ratio = ({ usedMoney, budget, percent }: RatioProps) => {
  return (
    <>
      <div className={`flex justify-between items-center mt-5 text-[1.2rem]`}>
        <span>${usedMoney}</span>
        <span>of ${budget.maxAmount}</span>
      </div>

      <div className={`w-full h-4 bg-red-100 rounded-full relative mt-2`}>
        <div
          style={{ width: `${percent}%` }}
          className={`absolute top-0 left-0  h-full bg-pink-500 rounded-full`}
        ></div>
      </div>
    </>
  );
};

export default Ratio;

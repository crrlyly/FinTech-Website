import { useEffect, useState } from "react";
import { projectedValueCalc } from "../../../helpers/dashboardHelpers";

const InvestmentCalculator = () => {
  const [init, setInit] = useState<string>("");
  const [contribution, setContribution] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [returnPercent, setReturnPercent] = useState<string>("");
  const [projectedValue, setProjectedValue] = useState<string>("");
  const [contributedValue, setContributedValue] = useState<string>("");
  const [interestValue, setInterestValue] = useState<string>("");

  useEffect(() => {
    if (
      init === "" ||
      contribution === "" ||
      duration == "" ||
      returnPercent === ""
    ) {
      return;
    }

    const data = projectedValueCalc(
      Number(init),
      Number(contribution),
      Number(duration),
      Number(returnPercent),
    );

    setProjectedValue(data[0].toFixed(2).toString());
    setContributedValue(data[1].toFixed(2).toString());
    setInterestValue(data[2].toFixed(2).toString());
  }, [init, contribution, duration, returnPercent]);

  return (
    <div
      className={`w-full h-auto bg-(--primary) flex justify-center items-center`}
    >
      <div
        className={`w-full m-5 h-auto bg-(--card) rounded-2xl border border-white/10 text-white p-7`}
      >
        <div className={`flex items-center text-[1.2rem] font-bold mb-5`}>
          <span className="material-symbols-outlined text-green-500 mr-3">
            trending_up
          </span>
          Investment Calculator
        </div>
        <div className={``}>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="">Initial Investment</label>
            <input
              type="number"
              value={init}
              onChange={(e) => setInit(e.target.value)}
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="">Monthly contribution</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1`}
            />
          </div>
          <div className={`flex justify-between gap-3 mb-3`}>
            <div className={`flex flex-col flex-1 min-w-0`}>
              <label htmlFor="">Duration (years)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 w-full`}
              />
            </div>
            <div className={`flex flex-col flex-1 min-w-0`}>
              <label htmlFor="">Annual Return %</label>
              <input
                type="number"
                value={returnPercent}
                onChange={(e) => setReturnPercent(e.target.value)}
                className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 w-full`}
              />
            </div>
          </div>
          <div className={`bg-(--purple)/20 p-4 mt-5 rounded-2xl`}>
            Projected value in {duration || "0"} years{" "}
            <span className={`text-3xl block font-bold text-(--purple)`}>
              ${projectedValue || "0.00"}
            </span>{" "}
            <div>
              Contributed ${contributedValue || "0.00"} * Interest $
              {interestValue || "0.00"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;

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
    <div className={`w-full h-auto bg-pink-200 flex justify-center`}>
      <div className={`w-full m-5 h-auto bg-blue-200 p-5`}>
        <div>
          <span className="material-symbols-outlined">trending_up</span>
          Investment Calculator
        </div>
        <div className={``}>
          <div>
            <label htmlFor="">Initial Investment</label>
            <input
              type="number"
              value={init}
              onChange={(e) => setInit(e.target.value)}
              className={`bg-pink-200`}
            />
          </div>
          <div>
            <label htmlFor="">Monthly contribution</label>
            <input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className={`bg-pink-200`}
            />
          </div>
          <div>
            <div>
              <label htmlFor="">Duration (years)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={`bg-pink-200`}
              />
            </div>
            <div>
              <label htmlFor="">Annual Return %</label>
              <input
                type="number"
                value={returnPercent}
                onChange={(e) => setReturnPercent(e.target.value)}
                className={`bg-pink-200`}
              />
            </div>
          </div>
          <span>
            Projected Value in {duration} years <span>${projectedValue}</span>{" "}
            Contributed ${contributedValue} * Interest ${interestValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;

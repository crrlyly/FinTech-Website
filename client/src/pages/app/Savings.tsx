import TopNav from "../../components/app/shared/TopNav";
import SavingsHeader from "../../components/app/savings/SavingsHeader";
import SavingsStats from "../../components/app/savings/SavingsStats";
import Tip from "../../components/app/shared/Tip";
import SavingsList from "../../components/app/savings/SavingsList";
import { useState } from "react";
import type { Goal } from "../../models/Goal";
import { getGoals } from "../../services/goalApi";

const Savings = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  async function loadGoals() {
    try {
      const { goals } = await getGoals();
      if (goals.length > 0) {
        setGoals(goals);
      } else {
        console.log("No goals in database");
      }
      console.log(goals);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`w-full min-h-dvh pt-20 relative lg:pt-18 lg:w-[calc(100%-17.5rem)] flex flex-col lg:ml-70 lg:px-5 bg-(--primary)`}
    >
      <TopNav title="Savings Goals"></TopNav>
      <SavingsHeader loadGoals={loadGoals}></SavingsHeader>
      <SavingsStats></SavingsStats>
      <Tip
        tipString={`Your total balance is what you actually have. Money in goals is set aside — \"available to spend\" is what's left over for everyday use.`}
      ></Tip>
      <SavingsList goals={goals} loadGoals={loadGoals}></SavingsList>
    </div>
  );
};

export default Savings;

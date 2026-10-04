import SavingsCard from "./SavingsCard";
import { useEffect } from "react";
import type { Goal } from "../../../models/Goal";

type SavingsListProps = {
  goals: Goal[];
  loadGoals: () => Promise<void>;
};

const SavingsList = ({ goals, loadGoals }: SavingsListProps) => {
  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <div
      className={`w-full h-auto bg-(--primary) p-5 flex-1 flex flex-col gap-5 text-(--greyText) text-[1.1rem] lg:grid lg:grid-cols-3 lg:grid-rows-auto lg:flex-none`}
    >
      {goals.length !== 0
        ? goals.map((g) => <SavingsCard key={g.gid} goal={g} loadGoals={loadGoals}/>)
        : "No goals yet. Create one to start saving."}
    </div>
  );
};

export default SavingsList;

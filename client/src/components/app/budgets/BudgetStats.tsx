import StatCard from "../shared/StatCard";
import type { GetActivationProp } from "../../../pages/app/Budgets";

const BudgetStats = ({ activateBudget }: GetActivationProp) => {
  return (
    <div className={`${activateBudget ? "grid" : "hidden"} w-full h-auto bg-(--primary) grid-cols-2 gap-3 p-5`}>
      <StatCard></StatCard>
      <StatCard></StatCard>
      <StatCard></StatCard>
      <StatCard></StatCard>
    </div>
  );
};

export default BudgetStats;
